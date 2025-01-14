import SignalLight from "./SignalLight";

export default function Availability() {
  return (
    <div className="inline-flex flex-row items-center border rounded-full py-1 px-3">
      <SignalLight />
      <p className="text-sm">Open to Work</p>
    </div>
  );
}
