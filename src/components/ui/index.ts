// ─── UI Component Barrel ──────────────────────────────────────────────────────
// Import everything from one place:  import { Button, Card, Modal } from '@/components/ui'

// Button
export { Button, default as ButtonDefault } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Input & Textarea
export { Input, Textarea } from './Input';
export type { InputProps, TextareaProps, InputVariant } from './Input';

// Badge
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge';

// Card
export { Card, CardHeader, CardFooter } from './Card';
export type { CardProps, CardVariant, CardPadding } from './Card';

// Modal
export { Modal } from './Modal';
export type { ModalProps, ModalSize } from './Modal';

// Tooltip
export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipPlacement } from './Tooltip';
