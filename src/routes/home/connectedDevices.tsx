import { useState } from "react";
import clsx from "clsx";
import { useDeviceContext } from "../../context/DevicesContext";

interface ConnectedDevicesProps {
  onSelectDevice: (deviceName: string) => void;
}

export default function ConnectedDevices({
  onSelectDevice,
}: ConnectedDevicesProps) {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const { devices, setDevices } = useDeviceContext();

  return (
    <div
      id="ConnectedDevicesContainer"
      className="flex flex-col min-w-fit bg-base-200 rounded-md p-2 space-y-2"
    >
      <div
        className="font-bold bg-base-300 rounded-md px-2 py-1 h-min"
        onClick={() => {
          onSelectDevice("");
          setSelectedDevice("");
        }}
      >
        <h1>Connected Devices</h1>
      </div>
      {devices.length === 0 ? (
        <div className="h-max rounded-md px-2 py-1">
          No Devices Detected
        </div>
      ) : (
        devices.map((device) => {
          const isSelected = selectedDevice === device.mac;
          const deviceClass = clsx(
            "h-max rounded-md px-2 py-1 hover:bg-base-200",
            isSelected
              ? "bg-base-300 border-2 border-dotted border-base-300"
              : "bg-base-100 "
          );

          return (
            <div
              key={device.mac}
              className={deviceClass}
              title={device.mac+"@"+device.ip}
              onClick={() => {
                onSelectDevice(device.mac);
                setSelectedDevice(device.mac);
              }}
            >
              {device.display_name}
            </div>
          );
        })
      )}
    </div>
  );
}
