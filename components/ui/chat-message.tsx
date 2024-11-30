import Image from "next/image";

export type Message = {
  role: "assistant" | "user" | undefined;
  content?: string;
};

export const initialMessages: Message[] = [];

export function ChatMessage({ role = "assistant", content }: Message) {
  if (!content) {
    return null;
  }

  const isAssistant = role === "assistant";

  return (
    <div className="flex items-start m-2">
      {isAssistant && (
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#AEFF00" }}
        >
          <div className="w-8 h-8">
            <Image src="/bruno.svg" alt="Bruno" width={32} height={32} />
          </div>
        </div>
      )}
      {!isAssistant && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">You</span>
        </div>
      )}
      <div className="bg-muted ml-2 p-2 rounded-lg flex flex-col gap-1">
        <p className="font-bold">{isAssistant ? "Bruno" : "You"}</p>
        <p className="font-light">{content}</p>
      </div>
    </div>
  );
}
