
function BreadcrumbsNewsMedia() {
    return (
        <div>
            <nav className="w-full rounded-md bg-zinc-50 px-5 py-3 dark:bg-neutral-700">
                <ol className="list-reset flex">
                    <li>
                        <a
                            href="/"
                            className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                        >Trang Chủ</a
                        >
                    </li>
                    <li>
                        <span className="mx-2 text-neutral-400">/</span>
                    </li>
                    <li>
                        <a
                            href="/news/media"
                            className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                        >Truyền thông</a
                        >
                    </li>
                    {/*
                <li>
                    <span className="mx-2 text-neutral-400">/</span>
                </li>
                <li className="text-neutral-400">Cập nhật hàng tháng</li> */}
                </ol>
            </nav>
        </div>
    )
}

export default BreadcrumbsNewsMedia