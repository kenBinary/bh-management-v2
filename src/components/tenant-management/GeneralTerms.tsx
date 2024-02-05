import {
    Heading, Accordion, AccordionIcon,
    AccordionItem, AccordionButton, AccordionPanel,
} from "@chakra-ui/react";


export default function GeneralTerms() {
    return (
        <Accordion allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Heading size="md">General Terms</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    1. Use of Premises: The Tenant shall use the premises solely for residential purposes.
                    <br />
                    2. Maintenance and Repairs: The Tenant shall maintain the premises in a clean and
                    sanitary condition.
                    <br />
                    3. Alterations: No alterations to the premises are permitted without prior written
                    consent from the Landlord.
                    <br />
                    4. Liability: The Landlord is not liable for any damage or injury occurring on the
                    premises, except due to Landlord's negligence.
                    <br />
                    5. Termination: Either party may terminate this Agreement with a at least 14 days
                    written notice to the other party.
                    <br />
                    6. Personal Property: Tenants are responsible for the safety and security of their
                    personal belongings. The Landlord is not accountable for the loss, theft, or damage
                    of items belonging to the Tenant.
                    <br />
                    7. Waste Disposal: Tenants are responsible for the proper disposal of their garbage
                    and must adhere to the designated waste management policies of the boarding
                    house.
                    <br />
                    8. Advance Payment: Tenants are required to pay at least one month's rent in advance
                    as a deposit to secure their room. This deposit will be returned upon the end of the
                    contract, subject to deductions for any damages or outstanding dues.
                    <br />
                    9. Liability for Damages: Tenants are liable for any damages they cause to the property
                    or its furnishings. Payment for repair or replacement must be made by the tenant
                    responsible for the damage.
                    <br />
                    10. Governing Law: This Agreement shall be governed by the laws of [State/Country].
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}