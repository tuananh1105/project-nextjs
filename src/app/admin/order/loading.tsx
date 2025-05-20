import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
