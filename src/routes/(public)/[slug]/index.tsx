import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchPublicAPI } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";

export const useGetGroupDescriptionBySlug = routeLoader$(async ({ params }) => {
  const group = await fetchPublicAPI()
    .get(`/groups/${params.slug}/details`)
    .json<ApiResponse<{ group: Pick<Group, "description"> }>>();
  return group?.data?.group;
});

export default component$(() => {
  const groupSig = useGetGroupDescriptionBySlug();
  return (
    <div>
      <h2 class="mb-4 text-xl font-bold">What we’re about</h2>
      <div
        dangerouslySetInnerHTML={groupSig.value?.description}
        class="pros mt-6"
      ></div>
    </div>
  );
});
