import { Locale } from "./utils";

export const GRID = 20;
export const PADDING = 10;
export const MARGIN = 10;
export const HANDLE_RADIUS = 4.5;
export const INITIAL_XML = `\
<Diagram>
  <Interface id="i1" anchor="s" y="-60">
    <Stereotype/>
    <Title>Visitor</Title>
  </Interface>

  <Class id="c1" anchor="n" y="60" width="400">
    <Stereotype/>
    <Title>Concrete Visitor</Title>
    <Separator/>
    <Text>visitSomething(something: Something)</Text>
  </Class>

  <Implementation from="c1" to="i1"/>
</Diagram>
`;
export const INITIAL_CSS = `\
Interface {
  Title {
    font-style: italic;
  }
}

Class {
  Title {
    font-weight: bold;
  }
}
`;
export const LOCALES = [Locale.GERMAN, Locale.ENGLISH];
