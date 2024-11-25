"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { type Message, initialMessages, ChatMessage } from "./chat-message";
import Image from "next/image";

const PreLoader = () => (
  <div className="flex items-start m-2">
    <div
      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#AEFF00] dark:bg-[#6aa603]"
    >
      <div className="w-8 h-8">
        <Image src="/Bruno.svg" alt="Bruno" width={32} height={32} />
      </div>
    </div>
    <div className="ml-2 p-2 rounded-lg flex flex-col gap-1">
      <p className="italic font-bold text-foreground">Bruno</p>
      <p className="font-light flex items-center gap-2 text-foreground">
        Loading
        <span className="relative flex h-[10px] w-[10px] items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
        </span>
      </p>
    </div>
  </div>
);

const InputMessage = ({
  input,
  setInput,
  sendMessage,
}: {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  sendMessage: (messages: string) => Promise<void>;
}) => (
  <>
    <Input
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      value={input}
      type="text"
      aria-label="chat input"
      required
      className="text-foreground border rounded-full"
      placeholder="Type your message here..."
    />
    <Button
      type="submit"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
      className="bg-transparent hover:bg-transparent"
      size="icon"
    >
      <Send className="text-black" />
    </Button>
  </>
);

export function ChatPopUp() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    setLoading(true);

    const newMessages = [
      ...messages,
      { content: message, role: "user" } as Message,
    ];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages([
          ...newMessages,
          { content: data.text.trim(), role: "assistant" } as Message,
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            content:
              data.error ||
              "An error occurred while processing your request.",
            role: "assistant",
          } as Message,
        ]);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessages([
        ...newMessages,
        {
          content: "Unable to connect at this time.",
          role: "assistant",
        } as Message,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={togglePopup}
          className="relative overflow-hidden px-4 py-2 rounded-full bg-gradient-to-br from-[#90CA03] to-green-800 text-white font-semibold text-sm shadow-md transform hover:scale-105 active:scale-95 transition-all duration-200 ease-out group"
        >
          <span className="relative z-10">Chat with Bruno</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={togglePopup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed bottom-0 md:bottom-4 md:right-4 w-full md:w-[400px] h-[70vh] md:h-[500px] bg-card border rounded-t-2xl md:rounded-xl flex flex-col justify-between overflow-hidden bg-dark text-foreground"
              initial={{ translateY: "100%" }}
              animate={{ translateY: 0 }}
              exit={{ translateY: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-full h-2 px-4 my-2">
                {/* Optional top handler */}
              </div>

              <ScrollArea className="flex-1 px-2">
                {messages.length === 0 && !loading && (
                  <div className="py-14 h-full flex flex-col gap-6 items-center justify-center">
                    <div className="p-5 rounded-full flex items-center justify-center bg-[#AEFF00] dark:bg-[#6aa603]">
                      <div className="w-10 h-10">
                        <Image
                          src="/Bruno.svg"
                          alt="Bruno"
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>

                    <h1 className="text-lg tracking-tight text-center">
                      Hi, I&apos;m{" "}
                      <span className="font-semibold">Bruno</span>. How can I
                      assist you today?
                    </h1>
                  </div>
                )}
                <AnimatePresence>
                  {messages.map(({ content, role }, index) => (
                    <motion.div
                      ref={scrollRef}
                      key={index}
                      initial={{ opacity: 0, translateY: 20 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChatMessage role={role} content={content} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && <PreLoader />}
              </ScrollArea>

              <div className="w-full h-14 px-4 my-2 flex items-center gap-2">
                <InputMessage
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
