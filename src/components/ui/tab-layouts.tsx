import { Tabs } from "@medusajs/ui";
import Image from "next/image";

export function TabsLayout({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="w-full px-4">
      <Tabs defaultValue={tabs[0]?.value}>
        <Tabs.List className="flex w-full bg-gray-100 p-[2px] justify-between rounded-full mt-3">
          {tabs.map((tab) => (
            <Tabs.Trigger
              className="px-6 py-2 border-none cursor-pointer rounded-full text-gray-500 data-[state=active]:bg-white data-[state=active]:text-black font-medium"
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="mt-2">
          {tabs.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              className="h-[400px] overflow-y-scroll"
            >
              <Image
                src={tab.image}
                alt=""
                width={300}
                height={500} // đảm bảo ảnh cao hơn 200px
                className="object-cover border-gray-400 rounded-lg w-full"
              />
            </Tabs.Content>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
