This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Present! 🙋🏻‍♀️ 🙋🏼

<h2>Inspiration</h2>
<p>Every day in a 40-minute class, 10 minutes are spent just taking attendance. Attendance is inaccurate, and maintaining bulky registers is a pain.</p>
<p>We’ll not anymore; presenting to you Present! one-stop website to Maintain and Record your attendance accurately.</p>

<p>In my College, our professors spent almost 10 minutes calling out each student's name to take attendance.</p>
<p>It’s very tiring and time-consuming, especially in a class of 80 students. Through Present!, not only does it take them less time it also ensures accuracy.</p>

<h2>What it does</h2>

<li>Students and Teachers will register on the portal using their names, phone, and email.</li>
<li>The phone number will be verified using the Twilio service for SMS verification using OTP.</li>
<li>Once registered, the students will be directed to their profile page where a unique QR code is displayed and other details</li>
<li>Whereas in the case of the teachers they will be directed to a page with just their details.</li>
<li>This way the teacher can scan the QR code of the students and mark their attendance</li>


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
