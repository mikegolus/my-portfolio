const TheBooksPage = () => {
  return (
    <>
      <div className="viewport">
        <div className="content-container">
          <div className="content">
            <h1>Get In Touch</h1>
          </div>
        </div>
      </div>
      <style jsx>{`
        .viewport {
          max-width: 1280px;
          margin: 0 auto;
        }
        .content-container {
          flex: 1;
          align-self: center;
          padding: 4vw 4vw 4vw 2vw;
        }
        .content {
          max-width: 68ch;
          margin: 0 auto;
        }
        @media screen and (max-width: 640px) {
          .viewport {
            display: block;
          }
          .portrait-container {
            position: relative;
            top: unset;
            padding: 6vw 6vw 0;
            max-height: 60vh;
          }
          .content-container {
            padding: 6vw;
          }
        }
      `}</style>
    </>
  )
}

export default TheBooksPage
