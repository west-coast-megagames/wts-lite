export const regions = [
  {
    name: "Low Earth Orbit",
    code: "LE",
    terror: 0,
    type: "Space"
  },
  {
    name: "Mid Earth Orbit",
    code: "ME",
    terror: 0,
    type: "Space"
  },
  {
    name: "High Earth Orbit",
    code: "HE",
    terror: 0,
    type: "Space"
  },
  {
    name: "Lunar Orbit",
    code: "LO",
    terror: 0,
    type: "Space"
  },
  {
    name: "North America",
    code: "NA",
    terror: 0,
    type: "Ground"
  },
  {
    name: "South America",
    code: "SA",
    terror: 0,
    type: "Ground"
  },
  {
    name: "Europe",
    code: "EU",
    terror: 0,
    type: "Ground"
  },
  {
    name: "Africa",
    code: "AF",
    terror: 0,
    type: "Ground"
  },
  {
    name: "Austr-Asia",
    code: "AU",
    terror: 0,
    type: "Ground"
  },
  {
    name: "Antarctica",
    code: "AN",
    terror: 0,
    type: "Ground"
  },
  {
    name: "Arabstan",
    code: "AS",
    terror: 0,
    type: "Ground"
   }
]

export const regionList = regions.filter((el) => el.type === "Ground" && el.code !== "AN");