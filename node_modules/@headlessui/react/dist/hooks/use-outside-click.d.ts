import { MutableRefObject } from 'react';
declare type Container = MutableRefObject<HTMLElement | null> | HTMLElement | null;
declare type ContainerCollection = Container[] | Set<Container>;
declare type ContainerInput = Container | ContainerCollection;
export declare enum Features {
    None = 1,
    IgnoreScrollbars = 2
}
export declare function useOutsideClick(containers: ContainerInput | (() => ContainerInput), cb: (event: MouseEvent | PointerEvent, target: HTMLElement) => void, features?: Features): void;
export {};
