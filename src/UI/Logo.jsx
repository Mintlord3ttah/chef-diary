
export default function Logo() {
    // return <img className="w-36 h-36 inline-block rounded-md" src="/logo-dull.png" alt="logo" />
    return <h1 style={{fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'}} className="cstm-logo text-4xl font-extrabold leading-normal flex items-center gap-3">
            <img src="/chef-diary-logo.png" alt="Chef Diary Logo" className="size-16" />
            <span>CHEF DIARY</span>
        </h1>
}
