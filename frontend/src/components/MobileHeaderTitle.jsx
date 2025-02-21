import { Disclosure } from "@headlessui/react";

import Typography from "@mui/material/Typography";

export default function MobileHeaderTitle({ title }) {
  return (
    <Disclosure as="header" className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <Typography variant="h6" fontWeight="bold" color="black">
              {title}
            </Typography>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
