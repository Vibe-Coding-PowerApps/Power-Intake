"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors transition-transform transition-shadow transition-filter duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:brightness-105 active:scale-95 active:brightness-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Optional href to navigate to when the button is clicked */
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const [pressed, setPressed] = React.useState(false)
    const [hovered, setHovered] = React.useState(false)
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; key: number }>>([])
    const buttonRef = React.useRef<HTMLElement | null>(null)

    React.useImperativeHandle(ref as any, () => buttonRef.current)

    const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
      if (props.onClick) props.onClick(e as any)
      if (!e.defaultPrevented && href) {
        if (typeof window !== "undefined") window.location.assign(href)
      }
    }

    const createRipple = (clientX: number, clientY: number) => {
      const el = buttonRef.current as HTMLElement | null
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const key = Date.now()
      setRipples((p) => [...p, { x, y, key }])
      window.setTimeout(() => {
        setRipples((p) => p.filter((r) => r.key !== key))
      }, 500)
    }

    const handleMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
      setPressed(true)
      createRipple((e as React.MouseEvent).clientX, (e as React.MouseEvent).clientY)
      if (props.onMouseDown) props.onMouseDown(e as any)
    }
    const handleMouseUp: React.MouseEventHandler<HTMLElement> = (e) => {
      setPressed(false)
      if (props.onMouseUp) props.onMouseUp(e as any)
    }
    const handleMouseLeave: React.MouseEventHandler<HTMLElement> = (e) => {
      setPressed(false)
      setHovered(false)
      if (props.onMouseLeave) props.onMouseLeave(e as any)
    }

    const handlePointerEnter: React.PointerEventHandler<HTMLElement> = (e) => {
      setHovered(true)
      if ((props as any).onPointerEnter) (props as any).onPointerEnter(e as any)
    }
    const handlePointerLeave: React.PointerEventHandler<HTMLElement> = (e) => {
      setHovered(false)
      if ((props as any).onPointerLeave) (props as any).onPointerLeave(e as any)
    }

    const handleTouchStart: React.TouchEventHandler<HTMLElement> = (e) => {
      setPressed(true)
      const t = e.touches[0]
      if (t) createRipple(t.clientX, t.clientY)
      if (props.onTouchStart) props.onTouchStart(e as any)
    }
    const handleTouchEnd: React.TouchEventHandler<HTMLElement> = (e) => {
      setPressed(false)
      if (props.onTouchEnd) props.onTouchEnd(e as any)
    }

    const baseStyle = (props as any).style || {}
    const hoverStyle: React.CSSProperties = hovered
      ? {
          filter: baseStyle.filter ? `${baseStyle.filter} brightness(1.05)` : "brightness(1.05)",
          boxShadow: baseStyle.boxShadow || "0 12px 32px rgba(0,0,0,0.32)",
        }
      : {}
    const pressedStyle: React.CSSProperties = pressed
      ? {
          transform: baseStyle.transform ? `${baseStyle.transform} scale(0.98)` : "scale(0.98)",
          filter: baseStyle.filter ? `${baseStyle.filter} brightness(0.96)` : "brightness(0.96)",
        }
      : {}

    const combinedStyle = { ...baseStyle, ...hoverStyle, ...pressedStyle }

    const refFn = (node: any) => {
      buttonRef.current = node
      if (!ref) return
      if (typeof ref === "function") ref(node)
      else (ref as React.MutableRefObject<any>).current = node
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={refFn as any}
        {...props}
        style={combinedStyle}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          {children}
          {ripples.map((r) => (
            <span
              key={r.key}
              style={{
                position: "absolute",
                left: r.x,
                top: r.y,
                width: 8,
                height: 8,
                transform: "translate(-50%, -50%)",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.35)",
                pointerEvents: "none",
                animation: "ripple 480ms ease-out",
              }}
            />
          ))}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
