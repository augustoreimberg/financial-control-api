import { Entity } from "@/core/entities/entity"
import type { UniqueEntityID } from "@/core/entities/unique-entity-id"
import type { Optional } from "@/core/optional"
import type { EnumFrequency, EnumPaymentMethod } from "@prisma/client"

// Define the structure for the responsible field
export interface ResponsibleData {
  advisor: string // userId
  broker: string // userId
}

interface PolicyProps {
  name: string
  clientId: string
  responsible: ResponsibleData // Typed as ResponsibleData
  productId: string
  policyNumber: string
  validity: Date
  frequency: EnumFrequency
  monthlyPremium?: number
  annualPremium?: number
  paymentMethod: EnumPaymentMethod
  dueDate: Date
  createdAt: Date
  updatedAt?: Date
}

export class Policy extends Entity<PolicyProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get clientId() {
    return this.props.clientId
  }

  set clientId(clientId: string) {
    this.props.clientId = clientId
    this.touch()
  }

  get responsible() {
    return this.props.responsible
  }

  set responsible(responsible: ResponsibleData) {
    this.props.responsible = responsible
    this.touch()
  }

  get productId() {
    return this.props.productId
  }

  set productId(productId: string) {
    this.props.productId = productId
    this.touch()
  }

  get policyNumber() {
    return this.props.policyNumber
  }

  set policyNumber(policyNumber: string) {
    this.props.policyNumber = policyNumber
    this.touch()
  }

  get validity() {
    return this.props.validity
  }

  set validity(validity: Date) {
    this.props.validity = validity
    this.touch()
  }

  get frequency() {
    return this.props.frequency
  }

  set frequency(frequency: EnumFrequency) {
    this.props.frequency = frequency
    this.touch()
  }

  get monthlyPremium() {
    return this.props.monthlyPremium
  }

  set monthlyPremium(monthlyPremium: number | undefined) {
    this.props.monthlyPremium = monthlyPremium
    this.touch()
  }

  get annualPremium() {
    return this.props.annualPremium
  }

  set annualPremium(annualPremium: number | undefined) {
    this.props.annualPremium = annualPremium
    this.touch()
  }

  get paymentMethod() {
    return this.props.paymentMethod
  }

  set paymentMethod(paymentMethod: EnumPaymentMethod) {
    this.props.paymentMethod = paymentMethod
    this.touch()
  }

  get dueDate() {
    return this.props.dueDate
  }

  set dueDate(dueDate: Date) {
    this.props.dueDate = dueDate
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  public static create(props: Optional<PolicyProps, "createdAt">, id?: UniqueEntityID) {
    const policy = new Policy(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return policy
  }
}

