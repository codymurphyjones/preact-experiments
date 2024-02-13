export declare const messages: import("@preact/signals-core").Signal<{
    avatar: string;
    name: string;
    message: string;
}[]>;
export declare const addMessage: (avatar: string, user: string, message: string) => void;
