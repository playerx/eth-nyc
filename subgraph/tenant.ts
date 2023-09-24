export class TenantRegistry {
  tenants: Tenant[];

  createTenant(name: string, metadataUri: string) {
    this.tenants.push({
      name,
      metadataUri,
    });
  }
}

export class Tenant {
  name: string;
  metadataUri: string;
}

export class AvatarPack {
  tenant: Tenant;
}
