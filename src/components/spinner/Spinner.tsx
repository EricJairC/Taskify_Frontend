import './Spinner.css'

export default function Spinner() {
  return (
      <>
        <div className=' w-full h-[80vh] flex items-center justify-center'>
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
        </div>
      </>
  )
}
