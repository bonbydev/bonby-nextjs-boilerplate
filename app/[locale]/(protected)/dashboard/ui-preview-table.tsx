"use client";

import { useState } from "react";
import { FiSettings } from "react-icons/fi";

import {
  Accordion,
  Alert,
  AlertDescription,
  AlertTitle,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Checklist,
  Collapsible,
  Container,
  Dialog,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  EmptyState,
  Form,
  FormField,
  IconButton,
  Input,
  Label,
  Modal,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Navbar,
  NavLink,
  Pagination,
  PasswordInput,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  SearchInput,
  Select,
  Separator,
  Sheet,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
} from "@/components/ui";

export function UiPreviewTable() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [page, setPage] = useState(1);

  const rows: { name: string; preview: React.ReactNode }[] = [
    {
      name: "Accordion",
      preview: (
        <Accordion
          items={[{ id: "a1", trigger: "Section 1", content: "Content for section 1." }]}
        />
      ),
    },
    {
      name: "Alert",
      preview: (
        <Alert>
          <AlertTitle>Alert title</AlertTitle>
          <AlertDescription>Alert description text.</AlertDescription>
        </Alert>
      ),
    },
    {
      name: "AspectRatio",
      preview: (
        <AspectRatio ratio={16 / 9} className="bg-muted max-w-[120px] rounded border">
          <div />
        </AspectRatio>
      ),
    },
    {
      name: "Avatar",
      preview: <Avatar alt="User" src="" fallback="U" />,
    },
    {
      name: "Badge",
      preview: (
        <div className="flex flex-wrap gap-1">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
        </div>
      ),
    },
    {
      name: "Breadcrumb",
      preview: <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Current" }]} />,
    },
    {
      name: "Button",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      ),
    },
    {
      name: "ButtonGroup",
      preview: (
        <ButtonGroup>
          <Button variant="outline">One</Button>
          <Button variant="outline">Two</Button>
        </ButtonGroup>
      ),
    },
    {
      name: "Card",
      preview: (
        <Card className="max-w-[200px]">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">Card content</CardContent>
        </Card>
      ),
    },
    {
      name: "Checkbox",
      preview: (
        <label className="flex items-center gap-2 text-sm">
          <Checkbox />
          Label
        </label>
      ),
    },
    {
      name: "Checklist",
      preview: (
        <Checklist
          items={[
            { value: "a", label: "Option A" },
            { value: "b", label: "Option B" },
          ]}
          value={[]}
          onChange={() => {}}
        />
      ),
    },
    {
      name: "Collapsible",
      preview: (
        <Collapsible trigger="Click to expand" defaultOpen={false}>
          <p className="text-muted-foreground pt-2 text-sm">Hidden content.</p>
        </Collapsible>
      ),
    },
    {
      name: "Container",
      preview: (
        <Container className="max-w-[200px] border border-dashed py-2 text-center text-xs">
          Container
        </Container>
      ),
    },
    {
      name: "Dialog",
      preview: (
        <>
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={() => setDialogOpen(false)}
            title="Dialog"
            description="Dialog description"
            confirmLabel="OK"
            cancelLabel="Cancel"
          />
        </>
      ),
    },
    {
      name: "Dropdown",
      preview: (
        <Dropdown
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          trigger={
            <DropdownTrigger
              onClick={() => setDropdownOpen(true)}
              className="border-border hover:bg-secondary inline-flex items-center justify-center rounded-lg border bg-transparent px-4 py-2 text-sm font-medium transition-colors"
            >
              Open dropdown
            </DropdownTrigger>
          }
        >
          <DropdownContent>
            <DropdownItem onClick={() => setDropdownOpen(false)}>Item 1</DropdownItem>
            <DropdownItem onClick={() => setDropdownOpen(false)}>Item 2</DropdownItem>
          </DropdownContent>
        </Dropdown>
      ),
    },
    {
      name: "EmptyState",
      preview: (
        <EmptyState
          title="No items"
          description="Nothing here yet."
          action={<Button size="sm">Add</Button>}
        />
      ),
    },
    {
      name: "Form",
      preview: (
        <Form className="max-w-[180px]">
          <FormField label="Field" htmlFor="f1">
            <Input id="f1" placeholder="Input" />
          </FormField>
        </Form>
      ),
    },
    {
      name: "FormField",
      preview: (
        <FormField label="Label" description="Helper text">
          <Input placeholder="Placeholder" className="max-w-[180px]" />
        </FormField>
      ),
    },
    {
      name: "IconButton",
      preview: <IconButton icon={<FiSettings className="h-4 w-4" />} label="Settings" />,
    },
    {
      name: "Input",
      preview: <Input placeholder="Placeholder" className="max-w-[180px]" />,
    },
    {
      name: "Label",
      preview: <Label>Label text</Label>,
    },
    {
      name: "Navbar",
      preview: (
        <div className="max-w-[280px] overflow-hidden rounded border">
          <Navbar
            logo={<span className="text-sm font-semibold">Logo</span>}
            actions={<Button size="sm">Action</Button>}
          >
            <NavLink href="#">Link</NavLink>
          </Navbar>
        </div>
      ),
    },
    {
      name: "Modal",
      preview: (
        <>
          <Button variant="outline" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <ModalHeader>
              <ModalTitle>Modal title</ModalTitle>
              <ModalDescription>Modal description.</ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </>
      ),
    },
    {
      name: "Pagination",
      preview: <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />,
    },
    {
      name: "PasswordInput",
      preview: <PasswordInput placeholder="Password" className="max-w-[180px]" />,
    },
    {
      name: "Popover",
      preview: (
        <Popover trigger={<Button variant="outline">Open popover</Button>}>
          <div className="p-3 text-sm">Popover content</div>
        </Popover>
      ),
    },
    {
      name: "Progress",
      preview: <Progress value={60} className="max-w-[180px]" />,
    },
    {
      name: "Radio",
      preview: (
        <RadioGroup name="preview" value="a">
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      ),
    },
    {
      name: "ScrollArea",
      preview: (
        <ScrollArea maxHeight="80px" className="max-w-[180px] rounded border p-2">
          <p className="text-sm">Line one.</p>
          <p className="text-sm">Line two.</p>
          <p className="text-sm">Line three.</p>
        </ScrollArea>
      ),
    },
    {
      name: "SearchInput",
      preview: <SearchInput placeholder="Search…" className="max-w-[180px]" />,
    },
    {
      name: "Select",
      preview: (
        <Select
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
          placeholder="Select…"
          className="max-w-[180px]"
        />
      ),
    },
    {
      name: "Separator",
      preview: (
        <div className="flex w-full max-w-[180px] items-center gap-2">
          <span className="text-xs">A</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-xs">B</span>
        </div>
      ),
    },
    {
      name: "Sheet",
      preview: (
        <>
          <Button variant="outline" onClick={() => setSheetOpen(true)}>
            Open Sheet
          </Button>
          <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
            <SheetHeader>
              <SheetTitle>Sheet title</SheetTitle>
            </SheetHeader>
            <p className="text-muted-foreground py-4 text-sm">Sheet content</p>
          </Sheet>
        </>
      ),
    },
    {
      name: "Skeleton",
      preview: (
        <div className="max-w-[180px] space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ),
    },
    {
      name: "Slider",
      preview: <Slider defaultValue={50} className="max-w-[180px]" />,
    },
    {
      name: "Spinner",
      preview: <Spinner className="h-6 w-6" />,
    },
    {
      name: "Switch",
      preview: <Switch checked={true} onCheckedChange={() => {}} />,
    },
    {
      name: "Table",
      preview: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>A</TableHead>
              <TableHead>B</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
    },
    {
      name: "Tabs",
      preview: (
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="text-sm">
            Content 1
          </TabsContent>
          <TabsContent value="tab2" className="text-sm">
            Content 2
          </TabsContent>
        </Tabs>
      ),
    },
    {
      name: "Textarea",
      preview: <Textarea placeholder="Placeholder" className="max-w-[180px]" rows={2} />,
    },
    {
      name: "Tooltip",
      preview: (
        <Tooltip content="Tooltip text">
          <Button variant="outline" size="sm">
            Hover
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">Component</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="pt-4 align-top font-medium">{row.name}</TableCell>
              <TableCell className="pt-4 align-top">{row.preview}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
