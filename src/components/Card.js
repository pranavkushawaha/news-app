

export default function Card(props) {
  return (
    <div className="bg-white w-3/4 sm:w-1/2 md:w-1/4  mt-3 p-4 rounded-xl drop-shadow-xl">
      <a href={props.data.url} target="_blank">
        <div className="flex flex-col gap-4">
          <img className="rounded-xl" src={props.data.urlToImage} />
          <p className="line-clamp-2 text-2xl">{props.data.title}</p>
          <p className="line-clamp-5 text-sm">{props.data.description}</p>
          <div className="flex flex-col gap-1">
            <p className="text-black-950 font-bold text-xs">
              {props.data.author}
            </p>
            {/* <p>{props.data.source.name}</p> */}
            <p className="text-xs">{props.data.publishedAt}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
