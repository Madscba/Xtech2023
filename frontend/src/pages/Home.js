import ImagePicker from "../components/ImagePicker/ImagePicker";

function Home() {
  return (
    <div className="p-10 space-y-6 w-2/3 mx-auto">
        <h1 className="font-bold text-2xl">Submit images for detection</h1>
        <p>Hint: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
        <ImagePicker eyeSide="left"/>
        <ImagePicker eyeSide="right"/>
    </div>
  );
}

export default Home;
