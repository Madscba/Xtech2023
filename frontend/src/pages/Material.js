import Wrapper from "../layouts/Wrapper";
import NumberLabel from "../components/base/Labels/NumberLabel";

function Material() {
    return (
        <Wrapper>
            <div className="p-20 space-y-4">
                <a href="/dashboard">
                    <p className="text-indigo-500"><strong>Go back to dashboard</strong></p>
                </a>
                <div className="space-y-6 w-2/3">
                    <div className="space-y-2">
                        <h2>How to?</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec feugiat. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed</p>
                    </div>
                    <ul className="space-y-6">
                        <li className="number-bullet-point"><NumberLabel>1</NumberLabel>Viverra mauris in aliquam sem fringilla ut morbi tincidunt. </li>
                        <li className="number-bullet-point"><NumberLabel>2</NumberLabel>Viverra mauris in aliquam sem fringilla ut morbi tincidunt. </li>
                        <li className="number-bullet-point"><NumberLabel>3</NumberLabel>Viverra mauris in aliquam sem fringilla ut morbi tincidunt. </li>
                        <li className="number-bullet-point"><NumberLabel>4</NumberLabel>Viverra mauris in aliquam sem fringilla ut morbi tincidunt. </li>
                        <li className="number-bullet-point"><NumberLabel>5</NumberLabel>Viverra mauris in aliquam sem fringilla ut morbi tincidunt. </li>
                        <li className="number-bullet-point"><NumberLabel>6</NumberLabel>Viverra mauris in aliquam sem fringilla ut morbi tincidunt. </li>
                    </ul>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default Material;
  