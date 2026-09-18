declare module 'expo-router' {
  export const Stack: any;
  export const Tabs: any;
  export const Slot: any;
  export const Link: any;
  export const router: {
    push: (href: string) => void;
    replace: (href: string) => void;
    back: () => void;
    setParams: (params: Record<string, string>) => void;
  };
  export function useRouter(): {
    push: (href: string) => void;
    replace: (href: string) => void;
    back: () => void;
    setParams: (params: Record<string, string>) => void;
  };
  export function useLocalSearchParams<T = Record<string, string>>(): T;
  export function useSegments(): string[];
}

declare module '@expo/vector-icons' {
  import * as React from 'react';
  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }
  export const Ionicons: React.ComponentType<IconProps>;
  export const MaterialIcons: React.ComponentType<IconProps>;
  export const MaterialCommunityIcons: React.ComponentType<IconProps>;
  export const Feather: React.ComponentType<IconProps>;
}
