export default function FloatingWA() {
  return (
    <div className="max-w-md w-full fixed align-end bottom-24">
      <a href="https://api.whatsapp.com/send?phone=6285892942057&text=Halo, Admin Ganteng!%20Saya%20ingin%20bertanya%20seputar%20PetSpace%20dong">
        <button className="mr-10 w-14 h-14 bg-whatsapp hover:bg-whatsapp-hover ease-linear duration-200 rounded-full">
          <span>
            <i className="fab fa-whatsapp text-white text-4xl"></i>
          </span>
        </button>
      </a>
    </div>
  );
}
