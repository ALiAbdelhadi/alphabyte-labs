import { Switch } from "@/registry/ui/switch";
import { useState } from 'react';

export default function SwitchDemo() {
    const [basicSwitch, setBasicSwitch] = useState(false);

    return (
        <div>
            <Switch
                checked={basicSwitch}
                onCheckedChange={setBasicSwitch}
            />
        </div>
    );
}