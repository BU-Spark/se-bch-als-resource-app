## Getting Started

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. Please see the README in the pages directory for more information.

In NextJS, pages are linked in in /src/pages/PAGE_NAME.tsx. Docs for nextJS - https://nextjs.org/docs/basic-features/pages
We will be using mantine.dev (https://mantine.dev/pages/basics/) for our frontend library and typescript as our language.

[Figma](https://www.figma.com/file/DyqoNMMEL3wXJwHi6oNG90/Spring-2023-Feb-May?node-id=4-634&t=XyEwMESegYbW8d5T-0) has the design, we will strictly abide by that!

The good thing for NextJS is that we can route pages easily. Example:

```
import Link from 'next/link'

<ul className='flex flex-col  p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                    <li className='text-white'>
                        <Link  href='/' className='text-lg'>Home</Link>
                    </li>
                    <li className='text-white'>
                        <Link href='/Volunteering' className='text-lg'>Volunteering</Link>
                    </li>
                    <li className='text-white'>
                        <Link href='/VC' className='text-lg'>Experience</Link>
                    </li>
</ul>

```

The component directory contains a lot of our work. Please see the documentation in the components for more information on them. Add code for reusability there and import it to the pages in /src/pages/CommunicationPage, /src/pages/FinalPage, /src/pages/HomePage.
