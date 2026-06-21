type TGlobalAlignValues =
    | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'
    | 'safe center' | 'unsafe center';

type TFlexAlignBase = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'normal';

export type TStackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type TStackAlign =

    | TFlexAlignBase
    | TGlobalAlignValues
    | 'stretch'

    | 'baseline'
    | 'first baseline'
    | 'last baseline'

    | 'self-start'
    | 'self-end';

export type TJustifyContent =

    | TFlexAlignBase
    | TGlobalAlignValues
    | 'left'

    | 'right'
    | 'space-between'
    | 'space-around'

    | 'space-evenly'
    | 'stretch';
