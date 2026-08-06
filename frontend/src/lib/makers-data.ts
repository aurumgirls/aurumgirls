export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  shopName: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: 'stephanie',
    name: 'Stephanie Painter',
    role: 'Co-founder, Farm Operations',
    bio: 'Stephanie oversees farm operations and ensures our organic practices meet the highest standards.',
    shopName: 'Painterland Sisters',
  },
  {
    id: 'hayley',
    name: 'Hayley Painter',
    role: 'Co-founder, Product Development',
    bio: 'Hayley brings the magic of flavor creation, developing the delicious varieties of our skyr.',
    shopName: 'Painterland Sisters',
  },
  {
    id: 'family',
    name: 'The Painter Family',
    role: '5th Generation Dairy Farmers',
    bio: 'Farming in Tioga County, PA for over 100 years, preserving the land and traditions for future generations.',
    shopName: 'Painterland Sisters',
  }
];

export function getMakerByShopName(shopName: string): TeamMember {
  return teamMembers.find(m => m.shopName === shopName) || teamMembers[0];
}
