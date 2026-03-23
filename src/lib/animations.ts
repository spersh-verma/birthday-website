import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once
let registered = false;
export function registerGSAP() {
    if (!registered) {
        gsap.registerPlugin(ScrollTrigger);
        registered = true;
    }
}

// ─── Entrance Animations ─────────────────────────────────────────────

/** Fade + rise from below */
export function fadeInUp(
    el: Element | null,
    opts?: { delay?: number; duration?: number; y?: number }
) {
    if (!el) return;
    const { delay = 0, duration = 0.8, y = 40 } = opts ?? {};
    gsap.fromTo(
        el,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, ease: 'expo.out', clearProps: 'all' }
    );
}

/** Staggered fade-in-up for an array of elements */
export function staggerFadeInUp(
    els: NodeListOf<Element> | Element[],
    opts?: { stagger?: number; delay?: number; y?: number; duration?: number }
) {
    if (!els || !els.length) return;
    const { stagger = 0.07, delay = 0, y = 40, duration = 0.7 } = opts ?? {};
    gsap.fromTo(
        Array.from(els),
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, stagger, ease: 'expo.out', clearProps: 'all' }
    );
}

/** Letter-by-letter rise animation */
export function letterStagger(
    container: Element | null,
    opts?: { delay?: number; stagger?: number }
) {
    if (!container) return;
    const { delay = 0, stagger = 0.04 } = opts ?? {};
    const letters = container.querySelectorAll('.anim-letter');
    gsap.fromTo(
        Array.from(letters),
        { opacity: 0, y: 60, rotationX: -40 },
        {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.65,
            stagger,
            delay,
            ease: 'expo.out',
            clearProps: 'all',
        }
    );
}

// ─── ScrollTrigger Helpers ───────────────────────────────────────────

/** Fade + rise triggered by scroll */
export function scrollFadeInUp(
    el: Element | null,
    opts?: { delay?: number; y?: number; duration?: number; start?: string }
) {
    if (!el) return;
    const { delay = 0, y = 50, duration = 0.9, start = 'top 82%' } = opts ?? {};
    gsap.fromTo(
        el,
        { opacity: 0, y },
        {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'expo.out',
            clearProps: 'all',
            scrollTrigger: { trigger: el, start, once: true },
        }
    );
}

/** Staggered scroll entrance */
export function scrollStagger(
    trigger: Element | null,
    els: NodeListOf<Element> | Element[],
    opts?: { stagger?: number; y?: number; start?: string; duration?: number }
) {
    if (!trigger || !els || !els.length) return;
    const { stagger = 0.06, y = 40, start = 'top 80%', duration = 0.7 } = opts ?? {};
    gsap.fromTo(
        Array.from(els),
        { opacity: 0, y },
        {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: 'expo.out',
            clearProps: 'all',
            scrollTrigger: { trigger, start, once: true },
        }
    );
}

/** Slide in from left/right on scroll */
export function scrollSlideIn(
    el: Element | null,
    direction: 'left' | 'right' = 'left',
    opts?: { rotation?: number; start?: string; duration?: number }
) {
    if (!el) return;
    const { rotation = 0, start = 'top 80%', duration = 1 } = opts ?? {};
    const xFrom = direction === 'left' ? -100 : 100;
    gsap.fromTo(
        el,
        { opacity: 0, x: xFrom, rotation: direction === 'left' ? -rotation : rotation },
        {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration,
            ease: 'expo.out',
            clearProps: 'all',
            scrollTrigger: { trigger: el, start, once: true },
        }
    );
}

/** Polaroid drop-in from top */
export function polaroidDrop(
    el: Element | null,
    opts?: { finalRotation?: number; start?: string }
) {
    if (!el) return;
    const { finalRotation = 3, start = 'top 80%' } = opts ?? {};
    gsap.fromTo(
        el,
        { opacity: 0, y: -120, rotation: finalRotation - 8 },
        {
            opacity: 1,
            y: 0,
            rotation: finalRotation,
            duration: 1.1,
            ease: 'bounce.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: el, start, once: true },
        }
    );
}

/** Parallax scrub on scroll */
export function parallaxScrub(
    el: Element | null,
    yRange = -60,
    opts?: { trigger?: Element; start?: string; end?: string }
) {
    if (!el) return;
    const {
        trigger = el,
        start = 'top bottom',
        end = 'bottom top',
    } = opts ?? {};
    gsap.fromTo(
        el,
        { y: 0 },
        {
            y: yRange,
            ease: 'none',
            scrollTrigger: { trigger, start, end, scrub: 0.6 },
        }
    );
}

// ─── Micro-interaction helpers ────────────────────────────────────────

/** Springy pop animation (selection/click feedback) */
export function popAnimation(el: Element | null) {
    if (!el) return;
    gsap.fromTo(el, { scale: 0.85 }, { scale: 1, duration: 0.45, ease: 'back.out(2.5)' });
}

/** Magnetic button: call this in onMouseMove */
export function magneticMove(
    el: HTMLElement | null,
    e: MouseEvent | React.MouseEvent,
    strength = 0.35
) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' });
}

/** Reset magnetic offset */
export function magneticReset(el: HTMLElement | null) {
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
}

/** Button press feedback */
export function buttonPress(el: Element | null) {
    if (!el) return;
    gsap.fromTo(
        el,
        { scale: 1 },
        { scale: 0.91, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
    );
}

// ─── Split text helper ────────────────────────────────────────────────

/**
 * Wraps each character of a string in a <span class="anim-letter">.
 * Pass to React's dangerouslySetInnerHTML.
 */
export function splitLetters(text: string): string {
    return text
        .split('')
        .map(
            (ch) =>
                ch === ' '
                    ? '<span class="anim-letter inline-block">&nbsp;</span>'
                    : `<span class="anim-letter inline-block">${ch}</span>`
        )
        .join('');
}

export { gsap, ScrollTrigger };
