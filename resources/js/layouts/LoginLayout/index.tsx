import React from 'react';
export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="flex flex-col h-[50vh] min-w-[30%] items-center rounded-[10px] border-1 p-6">
                <div className='flex flex-col min-w-full min-h-full'>{children}</div>
            </div>
        </div>
    );
}
