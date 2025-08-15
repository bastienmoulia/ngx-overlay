---
keyword: TooltipPage
---

Tooltips are used to provide additional information about an element when the user hovers over it. They can be positioned relative to the element and can be customized with different styles.

## Basic Usage

The `ngxo-tooltip` component uses the `interestId` input property to create a tooltip that can be attached to any element with the same `interestfor` attribute value. The tooltip will be displayed when the user hovers over the element.

{{ NgDocActions.demo("TooltipDemoComponent") }}

## Positioning

The tooltip can be positioned using the position input property. The available positions are: `top`, `bottom`, `left`, and `right`. The default position is `top`.

{{ NgDocActions.demo("TooltipPositioningDemoComponent") }}

## Delay

You can set a delay for the tooltip to appear and disappear using the input properties `ngxoTooltipShowDelay` and `ngxoTooltipHideDelay`. The delay is specified in milliseconds.

{{ NgDocActions.demo("TooltipDelayDemoComponent") }}

## Custom Styles

You can customize the tooltip styles using CSS variables. The following variables are available:

| CSS Variable                    | Default value            |
| ------------------------------- | ------------------------ |
| --ngxo-tooltip-background-color | #000                     |
| --ngxo-tooltip-border           | none                     |
| --ngxo-tooltip-border-radius    | .25rem                   |
| --ngxo-tooltip-box-shadow       | none                     |
| --ngxo-tooltip-font             | normal 1rem              |
| --ngxo-tooltip-margin           | .5rem                    |
| --ngxo-tooltip-padding          | .5rem                    |
| --ngxo-tooltip-text-color       | #fff                     |
| --ngxo-tooltip-transition       | opacity 0.3s ease-in-out |

The inputs `ngxoTooltipClass` and `ngxoTooltipStyle` can be used to apply custom styles to the tooltip.

{{ NgDocActions.demo("TooltipCustomStyleDemoComponent") }}

> **Note**
> The class used was:
>
> ```css
> .fancyTooltip {
>   --ngxo-tooltip-background-color: #e85bc9;
>   --ngxo-tooltip-text-color: #150db0;
>   --ngxo-tooltip-offset: 0.1rem;
>   --ngxo-tooltip-border-radius: 1rem;
>   --ngxo-tooltip-border: none;
>   --ngxo-tooltip-padding: 0.5rem 1rem;
>   --ngxo-tooltip-margin: 0.5rem;
>   --ngxo-tooltip-font: normal 1.5rem Comic Sans MS, sans-serif;
>   --ngxo-tooltip-box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
>   --ngxo-tooltip-transition: opacity 0.5s ease-in-out;
> }
> ```
