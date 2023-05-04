import { useFormInput } from "../../../../Hooks/useFormInput";
import {
  FormEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import "../../../../CSS/file-upload-with-preview.min.css";
import { MutationTuple } from "@apollo/client";
import { UpsertCardType } from "../../../../GraphQL/Mutation";
import {
  Messages,
  validation as getValidation
} from "../../../../functions/validation";
import { Cardservice } from "../../../../GraphQL/typeDefs";
import { FileUploadWithPreview } from "../../../../functions/file-upload/src";
import { FieldFormWarning } from "../../../../Components/Messages/FieldFormWarning/FieldFormWarning";

type FormProps = {
  addCard: MutationTuple<
    UpsertCardType["UpsertCard"],
    UpsertCardType["UpsertCardVars"]
  >[0];
  card?: Cardservice;
};

let upload: FileUploadWithPreview | null = null;

export const Form = ({ addCard, card }: FormProps) => {
  const [validMessages, setValidMessages] = useState<Messages | null>(null);
  const [formValue] = useFormInput({
    name: card?.name || "",
    slug: card?.slug || "",
    content: card?.describe || "",
    price: card?.price || 0,
    position: card?.position || 0,
    tags: card?.tags.join(",") || "",
    checkbox: card?.available.toString() || "false"
  });
  const container = useRef() as MutableRefObject<HTMLDivElement>;
  const validation = useMemo(() => getValidation(), []);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const variables: UpsertCardType["UpsertCardVars"] = {
        available: formValue.value.checkbox === "true",
        describe: formValue.value.content,
        name: formValue.value.name,
        slug: formValue.value.slug,
        price: Number(formValue.value.price),
        tags: formValue.value.tags.replace(/\s/g, "").split(",")
      };
      const valid = validation({
        content: variables.describe,
        name: variables.name,
        other: variables.slug,
        price: variables.price,
        array: variables.tags
      });
      setValidMessages(valid);
      if (upload && upload.cachedFileArray) {
        variables.file = upload.cachedFileArray[0];
      }
      if (formValue.value.position)
        variables.position = Number(formValue.value.position);
      if (valid.isValid) await addCard({ variables });
      else window.scrollTo({ top: 150 });
    },
    [formValue.value, validation]
  );

  useEffect(() => {
    upload = new FileUploadWithPreview("myFirstImage", {
      accept: "image/*",
      text: {
        browse: "Выбрать файл",
        chooseFile: "Файл не выбран",
        label: "Изображение",
        selectedCount: "Файл выбран"
      }
    });
    return () => {
      upload = null;
    };
  }, []);

  return (
    <form
      id="form"
      className="needs-validation"
      method="post"
      role="form"
      data-testid={"cardForm"}
      onSubmit={onSubmit}
    >
      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Название <span className="text-muted">(на русском)</span>
          </label>
          <input
            name="name"
            type="text"
            className={`form-control ${
              validMessages &&
              validMessages.name &&
              (validMessages.name === "isValid" ? "is-valid" : "is-invalid")
            }`}
            id="name"
            placeholder="Название"
            value={formValue.value.name}
            onChange={formValue.onChange}
            required
          />
          <FieldFormWarning
            value={validMessages?.name}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>

        <div className="col-12">
          <label htmlFor="slug" className="form-label">
            Краткое описание
          </label>
          <input
            name="slug"
            type="text"
            className={`form-control ${
              validMessages &&
              validMessages.other &&
              (validMessages.other === "isValid" ? "is-valid" : "is-invalid")
            }`}
            id="slug"
            placeholder="Краткое описание"
            value={formValue.value.slug}
            onChange={formValue.onChange}
            required
          />
          <FieldFormWarning
            value={validMessages?.other}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>

        <div className="input-group">
          <label htmlFor={"content"} className="input-group-text">
            Описание
          </label>
          <textarea
            name="content"
            className={`form-control ${
              validMessages &&
              validMessages.content &&
              (validMessages.content === "isValid" ? "is-valid" : "is-invalid")
            }`}
            aria-label="With textarea"
            data-testid={"textarea"}
            value={formValue.value.content}
            onChange={formValue.onChange}
            required
          />
          <FieldFormWarning
            value={validMessages?.content}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>

        <div className="col-12">
          <label htmlFor="price" className="form-label">
            Стоимость
          </label>
          <input
            name="price"
            type="number"
            className={`form-control ${
              validMessages &&
              validMessages.price &&
              (validMessages.price === "isValid" ? "is-valid" : "is-invalid")
            }`}
            id="price"
            placeholder="Стоимость"
            value={formValue.value.price}
            onChange={formValue.onChange}
            required
          />
          <FieldFormWarning
            value={validMessages?.price}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>

        <div className="col-12">
          <label htmlFor="position" className="form-label">
            Позиция на витрине{" "}
            <span className="text-muted">(чем больше, тем выше)</span>
          </label>
          <input
            name="position"
            type="number"
            className="form-control"
            id="position"
            placeholder="Позиция"
            value={formValue.value.position}
            onChange={formValue.onChange}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="tags" className="form-label">
            Тэги <span className="text-muted">(через запятую)</span>
          </label>
          <input
            name="tags"
            type="text"
            className={`form-control ${
              validMessages &&
              validMessages.array &&
              (validMessages.array === "isValid" ? "is-valid" : "is-invalid")
            }`}
            id="tags"
            placeholder="Тэги"
            value={formValue.value.tags}
            onChange={formValue.onChange}
            required
          />
          <FieldFormWarning
            value={validMessages?.array}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>

        <div className="col-12">
          <input
            name="checkbox"
            type="checkbox"
            className="form-check-input"
            id="same-address"
            value={formValue.value.checkbox}
            checked={formValue.value.checkbox === "true"}
            onChange={formValue.onChange}
          />
          <label className="form-check-label mx-1" htmlFor="same-address">
            Сделать доступным для покупки.
          </label>
        </div>
        <div
          ref={container}
          className="custom-file-container mb-3"
          data-upload-id="myFirstImage"
        />
      </div>
      <hr className="my-4" />
      <button
        id="button"
        className="w-100 btn btn-success btn-lg"
        type="submit"
      >
        {card ? "Изменить" : "Добавить"}
      </button>
    </form>
  );
};
