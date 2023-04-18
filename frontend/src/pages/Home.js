import PlainWrapper from "../layouts/PlainWrapper";

function Home() {

  return (
    <PlainWrapper>
        <div className="mx-auto w-full md:w-2/3 md:max-w-[600px]">
          <p className="font-bold text-accent text-5xl text-left leading-[120%] pb-8">We are here to prevent eye diseases by combining the power of AI and doctors</p>
          <a className="button orange" href="/login">Login</a>
        </div>
    </PlainWrapper>
  );
}

export default Home;
