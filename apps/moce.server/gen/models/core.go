package models

import (
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/romvales/moceserver/db"
	"google.golang.org/protobuf/types/known/anypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (u *User) ToDb() *db.User {
	o := &db.User{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Name:     u.Name,
		Username: u.Username,
		Email:    u.Email,
	}

	return o
}

func ToUserProto(u *db.User) *User {
	o := &User{
		Id:        u.ID,
		Created:   timestamppb.New(u.Created.Time),
		Updated:   timestamppb.New(u.Updated.Time),
		Deleted:   timestamppb.New(u.Deleted.Time),
		Name:      u.Name,
		Username:  u.Username,
		Email:     u.Email,
		Shops:     []*Shop{},
		Customers: []*Customer{},
	}

	return o
}

func (u *Shop) ToDb() *db.Shop {
	o := &db.Shop{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Name:       u.Name,
		Desc:       u.Desc,
		Currency:   u.Currency,
		WeightUnit: u.WeightUnit,

		UserId: u.UserId,
	}

	if u.Deleted != nil {
		o.Deleted = pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		}
	}

	return o
}

func ToShopProto(u *db.Shop) *Shop {
	return &Shop{
		Id:            u.ID,
		Created:       timestamppb.New(u.Created.Time),
		Updated:       timestamppb.New(u.Updated.Time),
		Deleted:       timestamppb.New(u.Deleted.Time),
		Name:          u.Name,
		Desc:          u.Desc,
		Currency:      u.Currency,
		WeightUnit:    u.WeightUnit,
		UserId:        u.UserId,
		User:          nil,
		Products:      []*Product{},
		Locations:     []*Location{},
		Orders:        []*Order{},
		ShippingZones: []*ShippingZone{},
		Discounts:     []*Discount{},
		TaxConfig:     []*TaxConfiguration{},
	}
}

func (u *Channel) ToDb() *db.SalesChannel {
	return &db.SalesChannel{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Name:   u.Name,
		Typ:    u.Typ,
		Active: u.Active,
		ShopId: u.ShopId,
	}
}

func ToChannelProto(u *db.SalesChannel) *Channel {
	return &Channel{
		Id:      u.ID,
		Created: timestamppb.New(u.Created.Time),
		Updated: timestamppb.New(u.Updated.Time),
		Name:    u.Name,
		Typ:     u.Typ,
		Active:  u.Active,
		ShopId:  u.ShopId,
	}
}

func (u *ChannelProduct) ToDb() *db.ChannelProduct {
	o := &db.ChannelProduct{
		ID:        u.Id,
		Active:    u.Active,
		ProductId: u.ProductId,
		ChannelId: u.ChannelId,
	}

	return o
}

func ToChannelProductProto(u *db.ChannelProduct) *ChannelProduct {
	return &ChannelProduct{
		Id:        u.ID,
		Active:    u.Active,
		ProductId: u.ProductId,
		ChannelId: u.ChannelId,
	}
}

func (u *Location) ToDb() *db.Location {
	o := &db.Location{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Active:  u.Active,
		Country: pgtype.Text{String: u.Country},
		State:   pgtype.Text{String: u.State},
		City:    pgtype.Text{String: u.City},
		Zip:     pgtype.Text{String: u.Zip},

		Addresses: []string{},

		Phone: pgtype.Text{String: u.Phone},

		ShopId: u.ShopId,
	}

	return o
}

func ToLocationProto(u *db.Location) *Location {
	return &Location{
		Id:              u.ID,
		Created:         timestamppb.New(u.Created.Time),
		Updated:         timestamppb.New(u.Updated.Time),
		Country:         u.Country.String,
		State:           u.State.String,
		City:            u.City.String,
		Zip:             u.Zip.String,
		Phone:           u.Phone.String,
		Addresses:       u.Addresses,
		Active:          u.Active,
		ShopId:          u.ShopId,
		Shop:            nil,
		InventoryLevels: []*InventoryLevel{},
		Adjustments:     []*InventoryAdjustment{},
	}
}

func (u *Customer) ToDb() *db.Customer {
	o := &db.Customer{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		FullName:  u.FullName,
		Email:     u.Email,
		Phone:     pgtype.Text{String: u.Phone},
		Note:      pgtype.Text{String: u.Note},
		Tags:      []string{},
		TaxExempt: u.TaxExempt,
		OwnerId:   u.OwnerId,
	}

	if u.Deleted != nil {
		o.Deleted = pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		}
	}

	return o
}

func ToCustomerProto(u *db.Customer) *Customer {
	return &Customer{
		Id:        u.ID,
		Created:   timestamppb.New(u.Created.Time),
		Updated:   timestamppb.New(u.Updated.Time),
		Deleted:   timestamppb.New(u.Deleted.Time),
		FullName:  u.FullName,
		Email:     u.Email,
		Phone:     u.Phone.String,
		Tags:      u.Tags,
		Note:      u.Note.String,
		TaxExempt: u.TaxExempt,
		Orders:    []*Order{},
		Addresses: []*CustomerAddress{},
		OwnerId:   u.OwnerId,
		Owner:     nil,
	}
}

func (u *CustomerAddress) ToDb() *db.CustomersAddress {
	o := &db.CustomersAddress{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Name:       u.Name,
		Company:    pgtype.Text{String: u.Company},
		Country:    pgtype.Text{String: u.Country},
		State:      pgtype.Text{String: u.State},
		Zip:        pgtype.Text{String: u.Zip},
		Addresses:  []string{},
		Phone:      pgtype.Text{String: u.Phone},
		CustomerId: u.CustomerId,
		Position:   u.Position,
	}

	return o
}

func ToCustomerAddressProto(u *db.CustomersAddress) *CustomerAddress {
	return &CustomerAddress{
		Id:             u.ID,
		Created:        timestamppb.New(u.Created.Time),
		Updated:        timestamppb.New(u.Updated.Time),
		Name:           u.Name,
		Company:        u.Company.String,
		State:          u.State.String,
		City:           u.City.String,
		Zip:            u.Zip.String,
		Addresses:      u.Addresses,
		Phone:          u.Phone.String,
		CustomerId:     u.CustomerId,
		Customer:       nil,
		OrderShippings: []*Order{},
		OrderBills:     []*Order{},
		Position:       u.Position,
	}
}

func (u *Product) ToDb() *db.Product {
	return &db.Product{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Deleted: pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		},

		Archived: pgtype.Timestamp{
			Time:  u.Archived.AsTime(),
			Valid: true,
		},

		Published: pgtype.Timestamp{
			Time:  u.Published.AsTime(),
			Valid: true,
		},

		Status: db.ProductStatus(u.Status),

		Title:  u.Title,
		Type:   pgtype.Text{String: u.Type},
		Tags:   []string{},
		ShopId: u.ShopId,
	}
}

func ToProductProto(u *db.Product) *Product {
	return &Product{
		Id:          u.ID,
		Created:     timestamppb.New(u.Created.Time),
		Updated:     timestamppb.New(u.Updated.Time),
		Deleted:     timestamppb.New(u.Deleted.Time),
		Archived:    timestamppb.New(u.Archived.Time),
		Published:   timestamppb.New(u.Published.Time),
		Status:      Product_ProductStatus(Product_ProductStatus_value[string(u.Status)]),
		Title:       u.Title,
		Type:        u.Type.String,
		Tags:        u.Tags,
		ShopId:      u.ShopId,
		Shop:        nil,
		Variants:    []*ProductVariant{},
		Images:      []*ProductImage{},
		Options:     []*ProductOption{},
		LineItems:   []*LineItem{},
		Collections: []*CollectionProduct{},
		Channels:    []*ChannelProduct{},
	}
}

func (u *ProductVariant) ToDb() *db.ProductVariant {
	o := &db.ProductVariant{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Deleted: pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		},

		Title:       u.Title,
		Sku:         pgtype.Text{String: u.Sku},
		Barcode:     pgtype.Text{String: u.Barcode},
		Position:    u.Position,
		Taxable:     u.Taxable,
		ReqShipping: u.ReqShipping,
		Price:       pgtype.Numeric{},
		Weight:      pgtype.Float8{},
		WeightUnit:  u.WeightUnit,
		ProductId:   u.ProductId,
	}

	return o
}

func ToProductVariant(u *db.ProductVariant) *ProductVariant {
	return &ProductVariant{
		Id:            u.ID,
		Created:       timestamppb.New(u.Created.Time),
		Updated:       timestamppb.New(u.Updated.Time),
		Deleted:       timestamppb.New(u.Deleted.Time),
		Title:         u.Title,
		Sku:           u.Sku.String,
		Barcode:       u.Barcode.String,
		Position:      u.Position,
		Taxable:       u.Taxable,
		ReqShipping:   u.ReqShipping,
		Weight:        u.Weight.Float64,
		WeightUnit:    u.WeightUnit,
		ProductId:     u.ProductId,
		Product:       nil,
		InventoryItem: nil,
		LineItems:     []*LineItem{},
	}
}

func (u *ProductOption) ToDb() *db.ProductOption {
	o := &db.ProductOption{
		ID:        u.Id,
		Name:      u.Name,
		Position:  u.Position,
		Values:    u.Values,
		ProductId: u.ProductId,
	}

	return o
}

func ToProductOptionProto(u *db.ProductOption) *ProductOption {
	return &ProductOption{
		Id:        u.ID,
		Name:      u.Name,
		Position:  u.Position,
		Values:    u.Values,
		ProductId: u.ProductId,
	}
}

func (u *ProductImage) ToDb() *db.ProductImage {
	return &db.ProductImage{
		ID:        u.Id,
		Url:       u.Url,
		AltText:   u.AltText,
		Position:  u.Position,
		ProductId: u.ProductId,
	}
}

func ToProductImageProto(u *db.ProductImage) *ProductImage {
	return &ProductImage{
		Id:        u.ID,
		Url:       u.Url,
		AltText:   u.AltText,
		Position:  u.Position,
		ProductId: u.ProductId,
		Product:   nil,
	}
}

func (u *Order) ToDb() *db.Order {
	return &db.Order{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Deleted: pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		},

		Cancelled: pgtype.Timestamp{
			Time:  u.Cancelled.AsTime(),
			Valid: true,
		},

		Closed: pgtype.Timestamp{
			Time:  u.Closed.AsTime(),
			Valid: true,
		},

		Status:             db.OrderStatus(u.Status),
		FulfillmentStatus:  db.FulfillmentStatus(u.FulfillmentStatus),
		OrderNumber:        u.OrderNumber,
		Tags:               u.Tags,
		Note:               pgtype.Text{String: u.Note},
		Currency:           u.Currency,
		TotalPrice:         pgtype.Numeric{},
		Subtotal:           pgtype.Numeric{},
		TotalTax:           pgtype.Numeric{},
		TotalShippingPrice: u.TotalShippingPrice,
		CancelReason:       pgtype.Text{String: u.CancelReason},
		ShopId:             u.ShopId,
		CustomerId:         pgtype.Text{String: u.GetCustomerId()},
		ShippingAddressId:  pgtype.Text{String: u.ShippingAddressId},
		BillingAddressId:   pgtype.Text{String: u.BillingAddressId},
		ChannelId:          pgtype.Text{String: u.GetChannelId()},
	}
}

func ToOrderProto(u *db.Order) *Order {
	return &Order{
		Id:                u.ID,
		Created:           timestamppb.New(u.Created.Time),
		Updated:           timestamppb.New(u.Updated.Time),
		Deleted:           timestamppb.New(u.Deleted.Time),
		Cancelled:         timestamppb.New(u.Cancelled.Time),
		Closed:            timestamppb.New(u.Closed.Time),
		Status:            Order_OrderStatus(Order_OrderStatus_value[string(u.Status)]),
		FulfillmentStatus: Fulfillment_FulfillmentStatus(Fulfillment_FulfillmentStatus_value[string(u.FulfillmentStatus)]),
		OrderNumber:       u.OrderNumber,
		Tags:              u.Tags,
		Note:              u.Note.String,
		Currency:          u.Currency,
		CancelReason:      u.CancelReason.String,
		ShopId:            u.ShopId,
		CustomerId:        &u.CustomerId.String,
		ShippingAddressId: u.ShippingAddressId.String,
		BillingAddressId:  u.BillingAddressId.String,
		ChannelId:         &u.ChannelId.String,
	}
}

func (u *LineItem) ToDb() *db.OrderItem {
	o := &db.OrderItem{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Sku:         pgtype.Text{String: u.Sku},
		Vendor:      pgtype.Text{String: u.Vendor},
		Quantity:    float64(u.Quantity),
		Taxable:     u.Taxable,
		ReqShipping: u.ReqShipping,
		OrderId:     u.OrderId,
		ProductId:   pgtype.Text{String: *u.ProductId},
		VariantId:   pgtype.Text{String: *u.VariantId},
	}

	return o
}

func ToLineItemProto(u *db.OrderItem) *LineItem {
	return &LineItem{
		Id:           u.ID,
		Created:      timestamppb.New(u.Created.Time),
		Updated:      timestamppb.New(u.Updated.Time),
		Sku:          u.Sku.String,
		Vendor:       u.Vendor.String,
		Quantity:     float64(u.Quantity),
		Taxable:      u.Taxable,
		ReqShipping:  u.ReqShipping,
		OrderId:      u.OrderId,
		ProductId:    &u.ProductId.String,
		VariantId:    &u.VariantId.String,
		Order:        nil,
		Product:      nil,
		Variant:      nil,
		Fulfillments: []*FulfillmentLineItem{},
	}
}

func (u *Fulfillment) ToDb() *db.Fulfillment {
	return &db.Fulfillment{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Status:       db.FulfillmentStatus(u.Status),
		TrackCompany: pgtype.Text{String: u.TrackCompany},
		TrackNumber:  pgtype.Text{String: u.TrackNumber},
		TrackUrl:     pgtype.Text{String: u.TrackUrl},
		OrderId:      u.OrderId,
	}
}

func ToFulfillmentProto(u *db.Fulfillment) *Fulfillment {
	return &Fulfillment{
		Id:           u.ID,
		Created:      timestamppb.New(u.Created.Time),
		Updated:      timestamppb.New(u.Updated.Time),
		Status:       Fulfillment_FulfillmentStatus(Fulfillment_FulfillmentStatus_value[string(u.Status)]),
		TrackCompany: u.TrackCompany.String,
		TrackNumber:  u.TrackNumber.String,
		TrackUrl:     u.TrackUrl.String,
		OrderId:      u.OrderId,
		Order:        nil,
		Items:        []*FulfillmentLineItem{},
	}
}

func (u *FulfillmentLineItem) ToDb() *db.FulfillmentLineItem {
	return &db.FulfillmentLineItem{
		ID:            u.Id,
		Quantity:      u.Quantity,
		FulfillmentId: u.FulfillmentId,
		ItemId:        u.ItemId,
	}
}

func ToFulfillmentLineItemProto(u *db.FulfillmentLineItem) *FulfillmentLineItem {
	return &FulfillmentLineItem{
		Id:            u.ID,
		Quantity:      u.Quantity,
		FulfillmentId: u.FulfillmentId,
		ItemId:        u.ItemId,
		Item:          nil,
	}
}

func (u *Transaction) ToDb() *db.Transaction {
	return &db.Transaction{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Processed: pgtype.Timestamp{
			Time:  u.Processed.AsTime(),
			Valid: true,
		},

		Kind:     db.TransactionKind(u.Kind),
		Status:   db.TransactionStatus(u.Status),
		Amount:   pgtype.Numeric{},
		Currency: u.Currency,
	}
}

func ToTransactionProto(u *db.Transaction) *Transaction {
	return &Transaction{
		Id:        u.ID,
		Created:   timestamppb.New(u.Created.Time),
		Processed: timestamppb.New(u.Processed.Time),
		Kind:      Transaction_TransactionKind(Transaction_TransactionKind_value[string(u.Kind)]),
		Status:    Transaction_TransactionStatus(Transaction_TransactionStatus_value[string(u.Status)]),
		Currency:  u.Currency,
		Orders:    []*Order{},
	}
}

func (u *TransactionOrder) ToDb() *db.TransactionOrder {
	return &db.TransactionOrder{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		TransactionId: u.TransactionId,
		OrderId:       u.OrderId,
	}
}

func ToTransactionOrderProto(u *db.TransactionOrder) *TransactionOrder {
	return &TransactionOrder{
		Id:            u.ID,
		Created:       timestamppb.New(u.Created.Time),
		TransactionId: u.TransactionId,
		OrderId:       u.OrderId,
		Transaction:   nil,
		Order:         nil,
	}
}

func (u *PaymentGateway) ToDb() *db.PaymentGateway {
	return &db.PaymentGateway{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Name:        u.Name,
		IsActive:    u.IsActive,
		IsTestMode:  u.IsTestMode,
		Credentials: []byte("{}"),
	}
}

func ToPaymentGatewayProto(u *db.PaymentGateway) *PaymentGateway {
	return &PaymentGateway{
		Id:           u.ID,
		Created:      timestamppb.New(u.Created.Time),
		Updated:      timestamppb.New(u.Updated.Time),
		Name:         u.Name,
		IsActive:     u.IsActive,
		IsTestMode:   u.IsTestMode,
		Credentials:  &anypb.Any{},
		Transactions: []*Transaction{},
	}
}

func (u *InventoryItem) ToDb() *db.InventoryItem {
	return &db.InventoryItem{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Sku:         pgtype.Text{String: u.Sku},
		Barcode:     pgtype.Text{String: u.Barcode},
		Tracked:     u.Tracked,
		ReqShipping: u.ReqShipping,
	}
}

func ToInventoryItemProto(u *db.InventoryItem) *InventoryItem {
	return &InventoryItem{
		Id:          u.ID,
		Created:     timestamppb.New(u.Created.Time),
		Updated:     timestamppb.New(u.Updated.Time),
		Sku:         u.Sku.String,
		Barcode:     u.Barcode.String,
		Tracked:     u.Tracked,
		ReqShipping: u.ReqShipping,
		Levels:      []*InventoryLevel{},
	}
}

func (u *InventoryLevel) ToDb() *db.InventoryLevel {
	return &db.InventoryLevel{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		ItemId:     u.ItemId,
		LocationId: u.LocationId,
	}
}

func ToInventoryLevelProto(u *db.InventoryLevel) *InventoryLevel {
	return &InventoryLevel{
		Id:         u.ID,
		Created:    timestamppb.New(u.Created.Time),
		Updated:    timestamppb.New(u.Updated.Time),
		ItemId:     u.ItemId,
		LocationId: u.LocationId,
		Item:       nil,
		Location:   nil,
	}
}

func (u *InventoryAdjustment) ToDb() *db.InventoryAdjustment {
	return &db.InventoryAdjustment{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Reason:         u.Reason,
		Delta:          u.Delta,
		QuantityBefore: pgtype.Numeric{},
		QuantityAfter:  pgtype.Numeric{},

		Cost:       pgtype.Numeric{},
		Note:       pgtype.Text{String: *u.Note},
		ItemId:     u.ItemId,
		LocationId: u.LocationId,
		OrderId:    pgtype.Text{String: *u.OrderId},
	}
}

func ToInventoryAdjustmentProto(u *db.InventoryAdjustment) *InventoryAdjustment {
	return &InventoryAdjustment{
		Id:         u.ID,
		Created:    timestamppb.New(u.Created.Time),
		Reason:     u.Reason,
		Note:       &u.Note.String,
		ItemId:     u.ItemId,
		LocationId: u.LocationId,
		OrderId:    &u.OrderId.String,
		Order:      nil,
	}
}

func (u *InventoryHistory) ToDb() *db.InventoryHistory {
	return &db.InventoryHistory{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Type:   u.Type,
		Delta:  pgtype.Numeric{},
		Before: pgtype.Numeric{},
		After:  pgtype.Numeric{},

		ItemId:  u.ItemId,
		OrderId: pgtype.Text{String: *u.OrderId},
	}
}

func ToInventoryHistoryProto(u *db.InventoryHistory) *InventoryHistory {
	return &InventoryHistory{
		Id:      u.ID,
		Created: timestamppb.New(u.Created.Time),
		Type:    u.Type,
		ItemId:  u.ItemId,
		OrderId: &u.OrderId.String,
		Order:   nil,
		Item:    nil,
	}
}

func (u *Discount) ToDb() *db.Discount {
	return &db.Discount{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Deleted: pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		},

		Starts: pgtype.Timestamp{
			Time:  u.Starts.AsTime(),
			Valid: true,
		},

		Ends: pgtype.Timestamp{
			Time:  u.Ends.AsTime(),
			Valid: true,
		},

		Typ:     db.DiscountType(u.Typ),
		Value:   u.Value,
		Once:    u.Once,
		NumUsed: u.NumUsed,
		Code:    u.Code,
		ShopId:  u.ShopId,
	}
}

func ToDiscountProto(u *db.Discount) *Discount {
	return &Discount{
		Id:       u.ID,
		Created:  timestamppb.New(u.Created.Time),
		Updated:  timestamppb.New(u.Updated.Time),
		Starts:   timestamppb.New(u.Starts.Time),
		Ends:     timestamppb.New(u.Ends.Time),
		Typ:      DiscountType(DiscountType_value[string(u.Typ)]),
		Value:    u.Value,
		Once:     u.Once,
		NumUsed:  u.NumUsed,
		UsageLim: &u.UsageLim.Int32,
		Code:     u.Code,
		ShopId:   u.ShopId,
	}
}

func (u *DiscountUsage) ToDb() *db.DiscountUsage {
	return &db.DiscountUsage{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Value:      u.Value,
		Typ:        db.DiscountType(u.Typ),
		DiscountId: pgtype.Text{String: *u.DiscountId},
		OrderId:    pgtype.Text{String: *u.OrderId},
	}
}

func ToDiscountUsageProto(u *db.DiscountUsage) *DiscountUsage {
	return &DiscountUsage{
		Id:         u.ID,
		Created:    timestamppb.New(u.Created.Time),
		Value:      u.Value,
		Typ:        DiscountType(DiscountType_value[string(u.Typ)]),
		DiscountId: &u.DiscountId.String,
		OrderId:    &u.OrderId.String,
		Order:      nil,
		Discount:   nil,
	}
}

func (u *Webhook) ToDb() *db.Webhook {
	return &db.Webhook{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},
	}
}

func ToWebhookProto(u *db.Webhook) *Webhook {
	return &Webhook{
		Id:      u.ID,
		Created: timestamppb.New(u.Created.Time),
		Updated: timestamppb.New(u.Updated.Time),
	}
}

func (u *ShippingZone) ToDb() *db.ShippingZone {
	return &db.ShippingZone{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Deleted: pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		},

		Name:   u.Name,
		ShopId: u.ShopId,
	}
}

func ToShippingZoneProto(u *db.ShippingZone) *ShippingZone {
	return &ShippingZone{
		Id:      u.ID,
		Created: timestamppb.New(u.Created.Time),
		Updated: timestamppb.New(u.Updated.Time),
		Deleted: timestamppb.New(u.Deleted.Time),
		Name:    u.Name,
		ShopId:  u.ShopId,
		Shop:    nil,
		Rates:   []*ShippingRate{},
	}
}

func (u *ShippingRate) ToDb() *db.ShippingRate {
	return &db.ShippingRate{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Deleted: pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		},

		Name:  u.Name,
		Price: pgtype.Numeric{},

		SubtotalRange:    []pgtype.Numeric{},
		DeliveryDuration: []pgtype.Timestamp{},

		ZoneId: u.ZoneId,
	}
}

func ToShippingRateProto(u *db.ShippingRate) *ShippingRate {
	return &ShippingRate{
		Id:      u.ID,
		Created: timestamppb.New(u.Created.Time),
		Updated: timestamppb.New(u.Updated.Time),
		Deleted: timestamppb.New(u.Deleted.Time),

		Name:             u.Name,
		Price:            float64(u.Price.Exp),
		SubtotalRange:    []float64{},
		DeliveryDuration: []*timestamppb.Timestamp{},
		ZoneId:           u.ZoneId,
		Zone:             nil,
	}
}

func (u *TaxConfiguration) ToDb() *db.TaxConfiguration {
	return &db.TaxConfiguration{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Charges:     u.Charges,
		TaxIncluded: u.TaxIncluded,
		ShopId:      u.ShopId,
	}
}

func ToTaxConfigurationProto(u *db.TaxConfiguration) *TaxConfiguration {
	return &TaxConfiguration{
		Id:          u.ID,
		Created:     timestamppb.New(u.Created.Time),
		Updated:     timestamppb.New(u.Updated.Time),
		Charges:     u.Charges,
		TaxIncluded: u.TaxIncluded,
		ShopId:      u.ShopId,
	}
}

func (u *Tax) ToDb() *db.Tax {
	return &db.Tax{
		ID: u.Id,
		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Country:  u.Country,
		Rate:     u.Rate,
		ConfigId: u.ConfigId,
	}
}

func ToTaxProto(u *db.Tax) *Tax {
	return &Tax{
		Id:       u.ID,
		Created:  timestamppb.New(u.Created.Time),
		Updated:  timestamppb.New(u.Updated.Time),
		Country:  u.Country,
		Rate:     u.Rate,
		ConfigId: u.ConfigId,
		Config:   nil,
	}
}

func (u *TaxLine) ToDb() *db.TaxLine {
	return &db.TaxLine{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Title:   u.Title,
		Price:   pgtype.Numeric{},
		Rate:    u.Rate,
		ItemId:  pgtype.Text{String: *u.ItemId},
		OrderId: pgtype.Text{String: *u.OrderId},
	}
}

func ToTaxLineProto(u *db.TaxLine) *TaxLine {
	return &TaxLine{
		Id:      u.ID,
		Created: timestamppb.New(u.Created.Time),
		Updated: timestamppb.New(u.Updated.Time),
		Title:   u.Title,
		Rate:    u.Rate,
		ItemId:  &u.ItemId.String,
		OrderId: &u.OrderId.String,
		Item:    nil,
		Order:   nil,
	}
}

func (u *Collection) ToDb() *db.Collection {
	return &db.Collection{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},

		Deleted: pgtype.Timestamp{
			Time:  u.Deleted.AsTime(),
			Valid: true,
		},

		Published: pgtype.Timestamp{
			Time:  u.Published.AsTime(),
			Valid: true,
		},

		IsPublish: u.IsPublish,
		Sort:      pgtype.Text{String: *u.Sort},

		Title: u.Title,
		Desc:  pgtype.Text{String: *u.Desc},

		ShopId: u.ShopId,
	}
}

func ToCollectionProto(u *db.Collection) *Collection {
	return &Collection{
		Id:        u.ID,
		Created:   timestamppb.New(u.Created.Time),
		Updated:   timestamppb.New(u.Updated.Time),
		Deleted:   timestamppb.New(u.Deleted.Time),
		Published: timestamppb.New(u.Published.Time),
		IsPublish: u.IsPublish,
		Sort:      &u.Sort.String,
		Title:     u.Title,
		Desc:      &u.Desc.String,
		ShopId:    u.ShopId,
		Shop:      nil,
		Products:  []*CollectionProduct{},
		Images:    []*CollectionImage{},
	}
}

func (u *CollectionProduct) ToDb() *db.CollectionProduct {
	return &db.CollectionProduct{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		CollectionId: u.CollectionId,
		ProductId:    u.ProductId,
	}
}

func ToCollectionProductProto(u *db.CollectionProduct) *CollectionProduct {
	return &CollectionProduct{
		Id:           u.ID,
		Created:      timestamppb.New(u.Created.Time),
		CollectionId: u.CollectionId,
		ProductId:    u.ProductId,
		Collection:   nil,
		Product:      nil,
	}
}

func (u *CollectionImage) ToDb() *db.CollectionImage {
	return &db.CollectionImage{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Url:      u.Url,
		AltText:  u.AltText,
		Position: u.Position,

		CollectionId: u.CollectionId,
	}
}

func ToCollectionImageProto(u *db.CollectionImage) *CollectionImage {
	return &CollectionImage{
		Id:           u.ID,
		Created:      timestamppb.New(u.Created.Time),
		Url:          u.Url,
		AltText:      u.AltText,
		Position:     u.Position,
		CollectionId: u.CollectionId,
		Collection:   nil,
	}
}

func (u *Localization) ToDb() *db.Locale {
	return &db.Locale{
		ID: u.Id,

		Created: pgtype.Timestamp{
			Time:  u.Created.AsTime(),
			Valid: true,
		},

		Updated: pgtype.Timestamp{
			Time:  u.Updated.AsTime(),
			Valid: true,
		},
	}
}

func ToLocalizationProto(u *db.Locale) *Localization {
	return &Localization{
		Id:      u.ID,
		Created: timestamppb.New(u.Created.Time),
		Updated: timestamppb.New(u.Updated.Time),
	}
}
