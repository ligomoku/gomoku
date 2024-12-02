using System.Collections.Immutable;

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace GomokuServer.Analyzer;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class PropertyAttributeOnNextLineAnalyzer : DiagnosticAnalyzer
{
	private static readonly DiagnosticDescriptor AttributePropertyLineRule = new DiagnosticDescriptor(
		id: "GOMOKU001",
		title: "Ensure property after attribute is on a new line",
		messageFormat: "Property '{0}' should be placed on a new line after its attribute.",
		category: "Formatting",
		defaultSeverity: DiagnosticSeverity.Error,
		isEnabledByDefault: true,
		description: "Properties immediately following attributes should be placed on a new line for better readability.");

	public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics
		=> ImmutableArray.Create(AttributePropertyLineRule);

	public override void Initialize(AnalysisContext context)
	{
		context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
		context.EnableConcurrentExecution();

		// Register for syntax node analysis
		context.RegisterSyntaxNodeAction(AnalyzeProperty, SyntaxKind.PropertyDeclaration);
	}

	private static void AnalyzeProperty(SyntaxNodeAnalysisContext context)
	{
		var propertyDeclaration = (PropertyDeclarationSyntax)context.Node;

		if (propertyDeclaration.AttributeLists.Count == 0)
		{
			return;
		}

		var lastAttribute = propertyDeclaration.AttributeLists.Last();
		var lastAttributeLine = lastAttribute.GetLocation().GetLineSpan().EndLinePosition.Line;

		var location = propertyDeclaration.GetLocation();
		var lineSpan = location.GetLineSpan();
		var propertyStartLine = lineSpan.StartLinePosition.Line;
		var propertyEndLine = lineSpan.EndLinePosition.Line;

		if (propertyStartLine == propertyEndLine)
		{
			var diagnostic = Diagnostic.Create(
				AttributePropertyLineRule,
				propertyDeclaration.GetLocation(),
				propertyDeclaration.Identifier.Text);

			context.ReportDiagnostic(diagnostic);
		}
	}
}
