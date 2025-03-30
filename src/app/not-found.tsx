import Link from "next/link";
import ErrorLayout from "./error-layout";
export default function Custom404() {
  return (
    <ErrorLayout>
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-[70px] p-4">
        
        <div className="flex flex-col gap-1 text-base md:text-lg text-[#717171]">
          <p>Lost in the digital wilderness?</p>
          <p>
            Don&apos;t worry! While this page is under construction, let&apos;s
            redirect you to explore more of what our platform has to offer.
          </p>
        </div>
        <Link
          href="/"
          className="py-[6px] lg:py-[12px] px-[16px] rounded-[6px] leading-[24px] bg-[#269B69] text-[#FFFFFF]"
        >
          Back to Home Page
        </Link>
      </div>
    </ErrorLayout>

  );
}
