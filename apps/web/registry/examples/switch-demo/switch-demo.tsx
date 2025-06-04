import { Switch } from "@/components/ui/switch";
import React, { useState } from 'react';

const SwitchDemo: React.FC = () => {
    const [basicSwitch, setBasicSwitch] = useState(false);

    return (
        <div>
            <Switch
                checked={basicSwitch}
                onCheckedChange={setBasicSwitch}
            />
        </div>
    );
};

export default SwitchDemo;