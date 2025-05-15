import { ScrollArea } from "@/components/ui/scroll-area"

export default function ScrollAreaDemo() {
  return (
    <div className="mt-12 space-y-3">
      <div className="border rounded-lg border-gray-200 dark:border-gray-800 h-96 flex flex-col">
        <div className="p-4 border-b flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            UI
          </div>
          <div>
            <h3 className="font-medium">UI Library Discussion</h3>
            <p className="text-xs text-gray-500">3 participants</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <ScrollArea className="h-72">
            <div
              aria-hidden="true"
              className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-[#252525] dark:to-transparent pointer-events-none"
            />
            <div className="p-4 space-y-6">
              {[
                {
                  user: "Alex",
                  message: "Has anyone used the new ScrollArea component?",
                  time: "10:15 AM",
                  isCurrentUser: false,
                },
                {
                  user: "Taylor",
                  message:
                    "Yes, I've been using it for a dashboard project. It works great with complex layouts.",
                  time: "10:17 AM",
                  isCurrentUser: false,
                },
                {
                  user: "You",
                  message:
                    "I just integrated it into our design system. The auto-hiding scrollbar is a nice touch!",
                  time: "10:20 AM",
                  isCurrentUser: true,
                },
                {
                  user: "Alex",
                  message: "Can it handle horizontal scrolling as well?",
                  time: "10:22 AM",
                  isCurrentUser: false,
                },
                {
                  user: "You",
                  message:
                    "Yes, it supports both vertical and horizontal scrolling out of the box. You can also customize the scrollbar's appearance and behavior.",
                  time: "10:25 AM",
                  isCurrentUser: true,
                },
                {
                  user: "Taylor",
                  message:
                    "I found the alwaysShowScrollbar prop useful for touch devices where users might not know content is scrollable otherwise.",
                  time: "10:27 AM",
                  isCurrentUser: false,
                },
                {
                  user: "Alex",
                  message: "Does it handle window resize events properly?",
                  time: "10:30 AM",
                  isCurrentUser: false,
                },
                {
                  user: "You",
                  message:
                    "Yes, it updates appropriately on window resize. The component also manages scroll position effectively when content changes.",
                  time: "10:32 AM",
                  isCurrentUser: true,
                },
                {
                  user: "Taylor",
                  message:
                    "The fade-in/fade-out animations are smooth. I like how it doesn't distract from the content.",
                  time: "10:35 AM",
                  isCurrentUser: false,
                },
                {
                  user: "Alex",
                  message: "Any performance issues with larger content?",
                  time: "10:37 AM",
                  isCurrentUser: false,
                },
                {
                  user: "You",
                  message:
                    "It performs well even with very long content. It's built on Radix UI primitives, which are optimized for performance.",
                  time: "10:40 AM",
                  isCurrentUser: true,
                },
              ].map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isCurrentUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {!message.isCurrentUser && (
                      <p className="font-medium text-sm mb-1">{message.user}</p>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isCurrentUser
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
