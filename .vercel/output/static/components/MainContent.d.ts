type MessageDetail = {
    avatar: string;
    name: string;
    message: string;
};
export default function MainContent(props: {
    messages: MessageDetail[];
}): import("preact").JSX.Element;
export {};
