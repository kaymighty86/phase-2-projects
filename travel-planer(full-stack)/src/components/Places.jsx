import Place from "./Place";

export default function Places({ title, places, fallbackText, onSelectPlace, isLoading = false, loadingText }) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <Place key={place.id} placeData={place} onSelectPlace={onSelectPlace}/>
          ))}
        </ul>
      )}
    </section>
  );
}
