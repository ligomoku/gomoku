import { h } from 'snabbdom';
export const spinnerHtml = '<div class="spinner" aria-label="loading"><svg viewBox="-2 -2 54 54"><g mask="url(#mask)" fill="none"><path id="a" stroke-width="3.779" d="m21.78 12.64c-1.284 8.436 8.943 12.7 14.54 17.61 3 2.632 4.412 4.442 5.684 7.93"/><path id="b" stroke-width="4.157" d="m43.19 36.32c2.817-1.203 6.659-5.482 5.441-7.623-2.251-3.957-8.883-14.69-11.89-19.73-0.4217-0.7079-0.2431-1.835 0.5931-3.3 1.358-2.38 1.956-5.628 1.956-5.628"/><path id="c" stroke-width="4.535" d="m37.45 2.178s-3.946 0.6463-6.237 2.234c-0.5998 0.4156-2.696 0.7984-3.896 0.6388-17.64-2.345-29.61 14.08-25.23 27.34 4.377 13.26 22.54 25.36 39.74 8.666"/></g></svg></div>';
const pathAttrs = [
    {
        'stroke-width': 3.779,
        d: 'm21.78 12.64c-1.284 8.436 8.943 12.7 14.54 17.61 3 2.632 4.412 4.442 5.684 7.93',
    },
    {
        'stroke-width': 4.157,
        d: 'm43.19 36.32c2.817-1.203 6.659-5.482 5.441-7.623-2.251-3.957-8.883-14.69-11.89-19.73-0.4217-0.7079-0.2431-1.835 0.5931-3.3 1.358-2.38 1.956-5.628 1.956-5.628',
    },
    {
        'stroke-width': 4.535,
        d: 'm37.45 2.178s-3.946 0.6463-6.237 2.234c-0.5998 0.4156-2.696 0.7984-3.896 0.6388-17.64-2.345-29.61 14.08-25.23 27.34 4.377 13.26 22.54 25.36 39.74 8.666',
    },
];
export const spinnerVdom = () => h('div.spinner', {
    'aria-label': 'loading',
}, [
    h('svg', { attrs: { viewBox: '-2 -2 54 54' } }, [
        h('g', {
            attrs: {
                mask: 'url(#mask)',
                fill: 'none',
            },
        }, pathAttrs.map(attrs => h('path', { attrs }))),
    ]),
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zcGlubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQVMsTUFBTSxVQUFVLENBQUM7QUFFcEMsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUN0QixtbkJBQW1uQixDQUFDO0FBRXRuQixNQUFNLFNBQVMsR0FBRztJQUNoQjtRQUNFLGNBQWMsRUFBRSxLQUFLO1FBQ3JCLENBQUMsRUFBRSxpRkFBaUY7S0FDckY7SUFDRDtRQUNFLGNBQWMsRUFBRSxLQUFLO1FBQ3JCLENBQUMsRUFBRSwrSkFBK0o7S0FDbks7SUFDRDtRQUNFLGNBQWMsRUFBRSxLQUFLO1FBQ3JCLENBQUMsRUFBRSx5SkFBeUo7S0FDN0o7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEdBQVUsRUFBRSxDQUNyQyxDQUFDLENBQ0MsYUFBYSxFQUNiO0lBQ0UsWUFBWSxFQUFFLFNBQVM7Q0FDeEIsRUFDRDtJQUNFLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtRQUM5QyxDQUFDLENBQ0MsR0FBRyxFQUNIO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxZQUFZO2dCQUNsQixJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0YsRUFDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FDN0M7S0FDRixDQUFDO0NBQ0gsQ0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgVk5vZGUgfSBmcm9tICdzbmFiYmRvbSc7XG5cbmV4cG9ydCBjb25zdCBzcGlubmVySHRtbCA9XG4gICc8ZGl2IGNsYXNzPVwic3Bpbm5lclwiIGFyaWEtbGFiZWw9XCJsb2FkaW5nXCI+PHN2ZyB2aWV3Qm94PVwiLTIgLTIgNTQgNTRcIj48ZyBtYXNrPVwidXJsKCNtYXNrKVwiIGZpbGw9XCJub25lXCI+PHBhdGggaWQ9XCJhXCIgc3Ryb2tlLXdpZHRoPVwiMy43NzlcIiBkPVwibTIxLjc4IDEyLjY0Yy0xLjI4NCA4LjQzNiA4Ljk0MyAxMi43IDE0LjU0IDE3LjYxIDMgMi42MzIgNC40MTIgNC40NDIgNS42ODQgNy45M1wiLz48cGF0aCBpZD1cImJcIiBzdHJva2Utd2lkdGg9XCI0LjE1N1wiIGQ9XCJtNDMuMTkgMzYuMzJjMi44MTctMS4yMDMgNi42NTktNS40ODIgNS40NDEtNy42MjMtMi4yNTEtMy45NTctOC44ODMtMTQuNjktMTEuODktMTkuNzMtMC40MjE3LTAuNzA3OS0wLjI0MzEtMS44MzUgMC41OTMxLTMuMyAxLjM1OC0yLjM4IDEuOTU2LTUuNjI4IDEuOTU2LTUuNjI4XCIvPjxwYXRoIGlkPVwiY1wiIHN0cm9rZS13aWR0aD1cIjQuNTM1XCIgZD1cIm0zNy40NSAyLjE3OHMtMy45NDYgMC42NDYzLTYuMjM3IDIuMjM0Yy0wLjU5OTggMC40MTU2LTIuNjk2IDAuNzk4NC0zLjg5NiAwLjYzODgtMTcuNjQtMi4zNDUtMjkuNjEgMTQuMDgtMjUuMjMgMjcuMzQgNC4zNzcgMTMuMjYgMjIuNTQgMjUuMzYgMzkuNzQgOC42NjZcIi8+PC9nPjwvc3ZnPjwvZGl2Pic7XG5cbmNvbnN0IHBhdGhBdHRycyA9IFtcbiAge1xuICAgICdzdHJva2Utd2lkdGgnOiAzLjc3OSxcbiAgICBkOiAnbTIxLjc4IDEyLjY0Yy0xLjI4NCA4LjQzNiA4Ljk0MyAxMi43IDE0LjU0IDE3LjYxIDMgMi42MzIgNC40MTIgNC40NDIgNS42ODQgNy45MycsXG4gIH0sXG4gIHtcbiAgICAnc3Ryb2tlLXdpZHRoJzogNC4xNTcsXG4gICAgZDogJ200My4xOSAzNi4zMmMyLjgxNy0xLjIwMyA2LjY1OS01LjQ4MiA1LjQ0MS03LjYyMy0yLjI1MS0zLjk1Ny04Ljg4My0xNC42OS0xMS44OS0xOS43My0wLjQyMTctMC43MDc5LTAuMjQzMS0xLjgzNSAwLjU5MzEtMy4zIDEuMzU4LTIuMzggMS45NTYtNS42MjggMS45NTYtNS42MjgnLFxuICB9LFxuICB7XG4gICAgJ3N0cm9rZS13aWR0aCc6IDQuNTM1LFxuICAgIGQ6ICdtMzcuNDUgMi4xNzhzLTMuOTQ2IDAuNjQ2My02LjIzNyAyLjIzNGMtMC41OTk4IDAuNDE1Ni0yLjY5NiAwLjc5ODQtMy44OTYgMC42Mzg4LTE3LjY0LTIuMzQ1LTI5LjYxIDE0LjA4LTI1LjIzIDI3LjM0IDQuMzc3IDEzLjI2IDIyLjU0IDI1LjM2IDM5Ljc0IDguNjY2JyxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBzcGlubmVyVmRvbSA9ICgpOiBWTm9kZSA9PlxuICBoKFxuICAgICdkaXYuc3Bpbm5lcicsXG4gICAge1xuICAgICAgJ2FyaWEtbGFiZWwnOiAnbG9hZGluZycsXG4gICAgfSxcbiAgICBbXG4gICAgICBoKCdzdmcnLCB7IGF0dHJzOiB7IHZpZXdCb3g6ICctMiAtMiA1NCA1NCcgfSB9LCBbXG4gICAgICAgIGgoXG4gICAgICAgICAgJ2cnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIG1hc2s6ICd1cmwoI21hc2spJyxcbiAgICAgICAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhdGhBdHRycy5tYXAoYXR0cnMgPT4gaCgncGF0aCcsIHsgYXR0cnMgfSkpXG4gICAgICAgICksXG4gICAgICBdKSxcbiAgICBdXG4gICk7XG4iXX0=