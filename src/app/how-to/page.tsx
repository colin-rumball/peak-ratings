import Image from "next/image";
import yourRatingsImage from "~/../public/imdb-your-ratings.png";
import menuImage from "~/../public/imdb-menu.png";
import exportImage from "~/../public/imdb-export.png";

const Page = () => {
  return (
    <main className="min-w-full">
      <div className="m-4">
        <p>
          You can export your ratings history anytime by logging into your IMDb
          account, heading to your ratings page and selecting the three dots ⋮
          in the upper right corner. Then select export, this will create a .csv
          file that you can save and upload here.
        </p>
        <Image src={yourRatingsImage} alt="screenshot of imdb profile menu" />
      </div>
      <div className="m-4">
        <p className="flex-1">
          Click the 3 dots to open a menu and select export.
        </p>
        <Image src={menuImage} alt="screenshot of imdb ... menu" />
        <Image
          src={exportImage}
          alt="screenshot of imdb ratings export button"
        />
      </div>
    </main>
  );
};

export default Page;
