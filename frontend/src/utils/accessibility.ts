/**
 * A utlity function to generate accessibility properties for an element
 * @param baseName The base name for all tabs and tab panels
 * @param index The index of the tab
 * @returns an object of properties
 */
export function tabA11yProps(baseName: string, index: number) {
  return {
    id: `${baseName}-tab-${index}`,
    "aria-controls": `${baseName}-tabpanel-${index}`,
  };
}
