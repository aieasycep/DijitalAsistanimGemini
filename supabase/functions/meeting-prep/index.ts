import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface RequestPayload {
  meeting_id?: string;
  attendee_info?: {
    name?: string;
    email?: string;
    purpose?: string;
    meeting_time?: string;
    context?: string;
  };
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Sadece POST istekleri desteklenmektedir." }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: RequestPayload = await req.json().catch(() => ({}));
    const { meeting_id, attendee_info } = payload;

    if (!meeting_id && !attendee_info) {
      return new Response(
        JSON.stringify({
          error: "Eksik parametre: 'meeting_id' veya 'attendee_info' alanlarından en az biri gereklidir.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Supabase Client bağlantısı (calendar_events)
    // Gerekli ENV ayarlarını mock/fallback olarak al
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "https://mock-project.supabase.co";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "mock-service-role-key";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let meetingEvent: any = null;

    if (meeting_id) {
      // calendar_events tablosundan ilgili toplantı verisini çek
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .eq("id", meeting_id)
        .maybeSingle();

      if (error) {
        console.warn("calendar_events sorgusu uyarısı:", error.message);
      }
      meetingEvent = data;
    }

    // Toplantı ve katılımcı detaylarını belirle
    const person =
      attendee_info?.name ||
      (meetingEvent?.attendees && Array.isArray(meetingEvent.attendees)
        ? meetingEvent.attendees[0]?.name || meetingEvent.attendees[0]?.email
        : null) ||
      "Mehmet Kaya";

    const meetingTime =
      meetingEvent?.start_time
        ? new Date(meetingEvent.start_time).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : attendee_info?.meeting_time || "14:30";

    const purpose =
      meetingEvent?.title ||
      attendee_info?.purpose ||
      "Revize fiyat teklifinin son değerlendirmesi ve sözleşme şartlarının görüşülmesi";

    // 2. AI Model API (Anthropic/OpenAI) çağrısı simülasyonu
    // Zorunlu prompt: 'Kişiyle olan önceki iletişimi ve toplantı amacını analiz et'
    const aiSystemPrompt =
      "Sen profesyonel bir yönetici asistanısın. Kişiyle olan önceki iletişimi ve toplantı amacını analiz et.";
    const aiUserPrompt = `Kişiyle olan önceki iletişimi ve toplantı amacını analiz et.
Toplantı Katılımcısı: ${person}
Toplantı Saati: ${meetingTime}
Toplantı Amacı: ${purpose}
Toplantı Açıklaması / Bağlam: ${
      attendee_info?.context || meetingEvent?.description || "4 gün önceki son görüşmede revize fiyat teklifi talep edildi."
    }

Analiz sonrası şu başlıkları çıkar:
1. Kişi (Person)
2. Toplantı Zamanı (Meeting time)
3. Toplantının Amacı (Purpose)
4. Konuşulacak 3 Ana Konu (3 talking points)
5. Açık Konular (Open loops)`;

    // Mock AI API key kontrolü ve simülasyon logu
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY") || "mock-anthropic-key";
    const openAiKey = Deno.env.get("OPENAI_API_KEY") || "mock-openai-key";
    console.log(`[AI Model Simulation] Prompt işleniyor (${anthropicKey ? "Anthropic" : "OpenAI"}):`, {
      system: aiSystemPrompt,
      prompt: aiUserPrompt,
    });

    // 3. Return payload: Person, Meeting time, Purpose, 3 talking points (Konuşulacak 3 Ana Konu), Open loops (Açık konular)
    const resultPayload = {
      person: person,
      meeting_time: meetingTime,
      purpose: purpose,
      talking_points: [
        "1. Revize fiyat teklifi — güncellenen rakamları ve birim maliyet analizini paylaş",
        "2. Teslim tarihi ve lansman takvimi — kesin nihai tarihi netleştir",
        "3. Sözleşme maddesi #7 (SLA & destek) — koşulları müzakere et ve mutabakata var",
      ],
      open_loops: [
        "Revize fiyat teklifi PDF'i henüz resmi olarak paylaşılmadı",
        "Hukuk biriminden revize sözleşme onay maddesi bekleniyor",
        "Entegrasyon test ortamı için API anahtarları henüz iletilmedi",
      ],
    };

    return new Response(JSON.stringify(resultPayload), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Bilinmeyen bir hata oluştu" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
