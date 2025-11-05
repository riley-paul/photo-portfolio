import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

export type Props = {
  images: string[];
  name: string;
};

export default function Gallery(props: Props) {
  const { images, name } = props;

  const windowKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        closeModal();
        break;

      case "ArrowRight":
        moveRight();
        break;

      case "ArrowLeft":
        moveLeft();
        break;

      default:
        console.log(e.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", windowKey);
    return () => window.removeEventListener("keydown", windowKey);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  function stopPrevent(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  function openImage(index: number) {
    setModalOpen(true);
    setModalIndex(index);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function moveRight() {
    setModalIndex((prev) => (prev = prev === images.length - 1 ? 0 : prev + 1));
  }

  function moveLeft() {
    setModalIndex((prev) => (prev = prev === 0 ? images.length - 1 : prev - 1));
  }

  return (
    <>
      <div id="gallery" className="columns-md">
        {images.map((image, i) => (
          <button key={i} onClick={() => openImage(i)} className="mb-4">
            <img className="rounded" src={image} alt={name} />
          </button>
        ))}
      </div>

      {modalOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-gray-600/90"
          onClick={closeModal}
        >
          <img
            className="h-full w-auto object-contain"
            src={images[modalIndex]}
            alt={name}
            onClick={stopPrevent}
            onKeyDown={stopPrevent}
          />

          <button
            className="btn btn-ghost fixed right-0 h-full w-32 rounded-r-none sm:h-1/3 sm:w-16"
            onClick={(e) => {
              moveRight();
              stopPrevent(e);
            }}
          >
            <ChevronRightIcon size="1.5rem" className="hidden sm:block" />
          </button>

          <button
            className="btn btn-ghost fixed left-0 h-full w-32 rounded-l-none sm:h-1/3 sm:w-16"
            onClick={(e) => {
              e.stopPropagation();
              moveLeft();
            }}
          >
            <ChevronLeftIcon size="1.5rem" className="hidden sm:block" />
          </button>

          <button
            onClick={(e) => {
              stopPrevent(e);
              closeModal();
            }}
            className="btn btn-ghost btn-circle fixed top-0 right-0 mt-4 mr-4"
          >
            <XIcon size="1.2rem" />
          </button>
        </div>
      )}
    </>
  );
}
