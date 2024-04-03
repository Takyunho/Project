import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ImageBox from "./components/ImageBox";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  console.log(imageList);

  const fileUpload = () => {
    // if (inputRef.current) {
    //   inputRef.current.click()
    // }
    //- 위의 코드 축약
    inputRef.current?.click();
  };

  const getFile = (event: any) => {
    // console.log(event.target.value)
    // console.log(event.currentTarget.value)

    if (event.currentTarget.files?.[0]) {
      // 0번째 파일이 있다면
      const file = event.currentTarget.files[0];
      console.log("%c 가져온 파일 객체", "color: lightblue;", file);

      // file path를 가져오기 위해 FileReader를 사용
      const reader = new FileReader();
      console.log("%c reader", "color: lightgreen;", reader);
      // file객체를 읽은 후 data url로 바꾸기
      reader.readAsDataURL(file);
      // load가 끝났으면
      reader.onloadend = (e) => {
        console.log("%c load가 끝난 후 event", "color: #78beff;", e);
        console.log("%c event.target", "color: #78beff;", e.target);
        setImageList((prevImg) => [...prevImg, e.target?.result as string]); // result는 여러개를 가질 수 있지만 data url이므로 무조건 string으로 들어오는 것을 알 수 있기 때문에 as string을 사용
      };
    }
  };

  // useEffect(() => {
  //   console.log(imageList)
  // }, [imageList]);

  return (
    <div className="container">
      <div className={"gallery-box " + (imageList.length > 0 && "row")}>
        {imageList.length === 0 && (
          <div className="text-center">
            이미지가 없습니다. <br />
            이미지를 추가해주세요.
          </div>
        )}

        {imageList.map((imagePath, index) => (
          <ImageBox key={index} src={imagePath} />
        ))}
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={getFile}
        />
        <button className="plus-box" onClick={fileUpload}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
