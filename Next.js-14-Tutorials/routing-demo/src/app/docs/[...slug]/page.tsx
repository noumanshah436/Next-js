export default function Doc({ params }: { params: { slug: string[] } }) {
  if (params.slug.length === 2) {
    // http://localhost:3000/docs/feature/1
    return (
      <h1>
        Viewing docs for feature {params.slug[0]} and concept {params.slug[1]}
      </h1>
    );
  } else if (params.slug.length === 1) {
    // http://localhost:3000/docs/feature
    return <h1>Viewing docs for feature {params.slug[0]}</h1>;
  }
  return <h1>Docs home page</h1>;
}

// https://www.youtube.com/watch?v=Ssw6-69KLRo&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=9

// Catch all Segments