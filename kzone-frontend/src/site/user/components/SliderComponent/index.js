import React from "react";
import { connect } from "react-redux";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./styled.scss";


const content = [
  {
    title: "Welcome to",
    description:
      "KZONE THE STAR HOTEL HAI PHONG",
    button: "Discover",
    image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/215142909.jpg?k=f2fcf84271a38ed9ab9cc76972dc72eeabf864994dc6e2af31fe7b14be7ce467&o=",
  },
  {
    title: "Nơi Cung Cấp Dịch Vụ Ăn Uống Hàng Đầu Hải Phòng",
    button: "Buy now",
    image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/215142950.jpg?k=349920beafe6a1684d380415f32bb4238640dfd20bf69681538bdbdb19f41842&o=",
  }
  ,
  {
    title: "Phòng Khách Sạn Tiêu Chuẩn 5*",
    button: "Buy now",
    image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/215141913.jpg?k=1c984ccd0aea31a75d420b557d602ca46260eae3bd913650c6155b645c05e088&o=",
  }
];

function SliderComponent(props) {

  return (
    <div>
      <Slider className="slider-wrapper">
        {content?.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }}
          >
            <div className="inner">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default connect()(SliderComponent);