import type { LucideProps } from "lucide-react";
import {
  Building2,
  ChevronRight,
  Compass,
  Droplets,
  FileText,
  Flame,
  Globe2,
  GraduationCap,
  Handshake,
  HardHat,
  Landmark,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MoveRight,
  Recycle,
  Share2,
  ShieldCheck,
  Store,
  Trees,
  Users,
  X,
} from "lucide-react";

const iconMap = {
  groups: Users,
  record_voice_over: Mic2,
  local_fire_department: Flame,
  nature_people: Leaf,
  recycling: Recycle,
  storefront: Store,
  travel_explore: Compass,
  handshake: Handshake,
  construction: HardHat,
  water: Droplets,
  school: GraduationCap,
  health_and_safety: ShieldCheck,
  account_balance: Landmark,
  location_on: MapPin,
  location_city: Building2,
  chat: MessageCircle,
  public: Globe2,
  share: Share2,
  history_edu: FileText,
  arrow_forward: MoveRight,
  chevron_right: ChevronRight,
  park: Trees,
  menu: Menu,
  close: X,
} satisfies Record<string, React.ComponentType<LucideProps>>;

export function DesktopIcon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = iconMap[name] ?? Building2;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export function resolveDesktopIconName(name: string) {
  return iconMap[name] ? name : "account_balance";
}
