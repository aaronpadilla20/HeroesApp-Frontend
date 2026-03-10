import { useSearchParams } from "react-router"

export const useCustonSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // App params
  const name = searchParams.get('name') ?? '';
  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';
  const activeAccordion = searchParams.get('active-accordion') ?? '';
  const selectedStrength = Number(searchParams.get('strength') ?? 0);

  return {
    // Values
    name,
    activeTab,
    page,
    limit,
    category,
    activeAccordion,
    searchParams,
    selectedStrength,

    // Methods
    setSearchParams
  }
}

