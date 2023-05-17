import PlainWrapper from "../layouts/PlainWrapper";

function Home() {

  return (
    <PlainWrapper>
        <div className="mx-auto w-full md:w-2/3 md:max-w-[600px]">
          <p className="font-bold text-primary text-3xl md:text-5xl text-left leading-[130%] md:leading-[120%] pb-8">We care about your eyes – we help detect and prevent eye diseases with screening and AI pre-diagnosis</p>
          <a className="button" href="/login">Login</a>
        </div>
    </PlainWrapper>
  );
}

export default Home;
